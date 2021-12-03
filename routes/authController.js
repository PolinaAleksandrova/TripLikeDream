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
                return "Ошибка при регистрации"
            }
            const username = req.body.login
            const password = req.body.password
            const candidate = await User.findOne({username})
            if (candidate) {
                return "Пользователь с таким именем уже существует"
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return "Пользователь успешно зарегистрирован"
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
            if (!user) {
                return `Пользователь ${username} не найден`
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return "Введен неверный пароль"
            }
            const token = generateAccessToken(user._id, user.roles)
            return "1"
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