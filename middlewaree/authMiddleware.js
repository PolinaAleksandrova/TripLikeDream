const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.cookies.auth;
        if (!token) {
            res.redirect('/auth/login')
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        req.temp = true;
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
};