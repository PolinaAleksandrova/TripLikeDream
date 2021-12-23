const User = require('../schemas/User')
const Role = require('../schemas/Role')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator')
const {secret} = require("../config")

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"} )
}

class authController {
    async registration(req, res) {
        try {
            console.log(req)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return "Помилка під час реєстрації"
            }

            const username = req.body.login
            const password = req.body.password
            const passwordRepeat = req.body.passwordRepeat
            const lastName = req.body.lastName
            const firstName = req.body.firstName
            const phoneNumber = req.body.phoneNumber

            const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

            const containsLetters = /^.*[a-zA-Z]+.*$/

            if(!regexEmail.test(String(username).toLowerCase())){
                return "(неправильна пошта)"
            }
            const candidate = await User.findOne({username})
            if (candidate) {
                return "Користувач із таким логіном зареєстрований"
            }
            if(password != passwordRepeat){
                return "(паролі не співпадають)"
            }
            if(password  == '' && passwordRepeat == ''){
                return "Пароль не може бути пустим"
            }
            if(!containsLetters.test(String(password).toLowerCase())){
                return "У паролі не повинно бути кирилиці"
            }
            if(!regexPhone.test(String(phoneNumber).toLowerCase())){
                return "(неправильно вказаний номер)"
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, lastName, firstName, phoneNumber, roles: [userRole.value]})
            await user.save()

            return "Користувач успішно зареєстрований"
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const username = req.body.login
            const password = req.body.password
            const user = await User.findOne({username})
            const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if(!regexEmail.test(String(username).toLowerCase())){
                return '(неправильна пошта)'
            }
            if (!user) {
                return 'Користувач не знайден'
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return '(неправильний пароль)'
            }
            const token = generateAccessToken(user._id, user.roles)
            res.cookie('auth', token);
            if(username == 'admin@gmail.com'){
                return 1;
            }
            else{
                return 0
            }
            //return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new authController()
