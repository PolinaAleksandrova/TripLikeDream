const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const authMiddleware = require('../middlewaree/authMiddleware')
const roleMiddleware = require('../middlewaree/roleMiddleware')

router.get('/registration', async (req, res) => {
    res.render('registration', {});
})
router.post('/registration', async (req, res)=>{
    const err = await controller.registration(req, res) 
    if(err == "Пользователь успешно зарегистрирован"){
        res.redirect('/auth/login')
    }
    res.render('registration', {err});
})
/*router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 11 символов").isLength({min:4, max:10})
], controller.registration)*/
router.get('/login', async (req, res) => {
    res.render('login', {});
})
//router.post('/login', controller.login)
router.post('/login', async (req, res)=>{
    const err = await controller.login(req, res) 
    if(err == 1){
        res.redirect('../../')
    }
    res.render('login', {err});
})
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router