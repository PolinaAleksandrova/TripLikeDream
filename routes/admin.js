
var { Router, Request, Response } = require('express');
const multer = require("multer")
const countrymodel = require('../schemas/country-schema')
const categorymodel = require('../schemas/category-schema')
const placemodel = require('../schemas/place-schema')
var path = require("path")

var bodyParser = require("body-parser")
var jsonParser = bodyParser.json({ extended: false });
const router = Router();



var upload = multer ({
    storage: multer.diskStorage ({
        destination: (req, file, cb)=>{
            cb (null, "./uploads")
        },
        filename: function(req, file, callback) {
            callback(null, req.body.name + "-" + Date.now() + path.extname(file.originalname))
        }
    })
})

router.get('/', jsonParser,(req,res)=>{
    res.render('admin', {})
})
router.post('/post', upload.single('image'), (req, res)=>{
    console.log(req.file);
    var x = new countrymodel();
    x.name =req.body.name;
    x.image = req.file.filename;
    x.save((err, doc)=>{
        if(!err){
            console.log('saved succesfully')
            res.redirect('/')
        } else {
            console.log(err);
        }

    })
})
router.post('/categorypost', jsonParser, (req, res)=>{

    var x = new categorymodel();
    x.name =req.body.name;
    x.save((err, doc)=>{
        if(!err){
            console.log('saved succesfully')
            res.redirect('/')
        } else {
            console.log(err);
        }

    })
})
router.post('/placepost', jsonParser, (req, res)=>{

    var x = new placemodel();
    x.name =req.body.name;
    x.country = req.body.country;
    x.category = req.body.category;
    x.save((err, doc)=>{
        if(!err){
            console.log('saved succesfully')
            res.redirect('/')
        } else {
            console.log(err);
        }

    })
})
router.get('/placeadd', jsonParser,(req,res)=>{

    countrymodel.find({}, function(err, docs){
    categorymodel.find({}, function(err, documents){
        res.render('placeadd', {
            items : docs,
            categories: documents
        })
})
})
})
router.use("/categoryadd", function(request, response){
    response.render("categoryadd", {})
});

router.use("/countryadd", function(request, response){
    response.render("countryadd", {})
});

module.exports = router;
