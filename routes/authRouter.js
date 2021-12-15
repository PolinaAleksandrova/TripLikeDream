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
    var errLogin
    var errPassword;
    var errPasswordRepeat
    var errPhoneNumber;

    if(err == "(неправильна пошта)"){
        errLogin = err;
    }
    else if(err == "Користувач із таким логіном зареєстрований"){
        errLogin = err;
    }
    else if(err == "Пароль не може бути пустим"){
        errPassword = err;
    }
    else if(err == "У паролі не повинно бути кирилиці"){
        errPassword = err;
    }
    else if(err == "(паролі не співпадають)"){
        errPasswordRepeat = err;
    }
    else if(err == "(неправильно вказаний номер)"){
        errPhoneNumber = err;
    }
    else if(err == "Користувач успішно зареєстрований"){
        res.redirect('/auth/login')
    }
    res.render('registration', { errLogin, errPassword, errPasswordRepeat, errPhoneNumber});
})

router.get('/login', async (req, res) => {
    res.render('login', {});
})
router.post('/login', async (req, res)=>{
    const err = await controller.login(req, res)
    var errLogin;
    var errPassword;

    if(err == '(неправильна пошта)'){
        errLogin = err;
    }
    else if(err == 'Користувач не знайден'){
        errLogin = err;
    }
    else if(err == '(неправильний пароль)'){
        errPassword = err;
    }
    else if(err == 1){
        res.redirect('/admin/')
    }
    else if(err == 0){
        res.redirect('/AreaP/personalArea')
    }
    res.render('login', { errLogin, errPassword})
})
router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)

module.exports = router
