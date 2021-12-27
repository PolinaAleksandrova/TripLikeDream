var { Router, Request, Response } = require('express');
const router = Router();

router.get('/feedbacks', (req,res)=>{
    res.render('feedbacks');
})

module.exports = router;