var { Router, Request, Response } = require('express');
const router = Router();

router.get('/events', (req,res)=>{
    res.render('events');
})

module.exports = router;
