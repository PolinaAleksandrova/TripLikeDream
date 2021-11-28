var { Router, Request, Response } = require('express');
const countrymodel = require('../schemas/country-schema')
var bodyParser = require("body-parser")
var jsonParser = bodyParser.json({ extended: false });
const router = Router();

router.get('/', jsonParser,(req,res)=>{

    countrymodel.find({}, function(err, docs){

        res.render('index', {
            items : docs
        })
})
})

module.exports = router;
