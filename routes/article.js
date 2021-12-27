var { Router, Request, Response } = require('express');
const router = Router();

router.get('/articles', (req,res)=>{
    res.render('articles');
})

module.exports = router;