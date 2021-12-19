var { Router, Request, Response } = require('express');
const router = Router();
const authMiddleware = require('../middlewaree/authMiddleware')

router.get('/personalArea', authMiddleware, (req,res)=>{
    res.render('personalArea', {num:3});
})

module.exports = router;
