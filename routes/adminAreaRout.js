var { Router, Request, Response } = require('express');
const router = Router();

router.get('/adminArea', (req,res)=>{
    res.render('adminArea');
})

module.exports = router;
