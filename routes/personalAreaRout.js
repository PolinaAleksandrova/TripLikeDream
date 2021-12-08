var { Router, Request, Response } = require('express');
const router = Router();

router.get('/personalArea', (req,res)=>{
    res.render('personalArea', {});
})

module.exports = router;
