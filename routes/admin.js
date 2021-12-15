
var { Router, Request, Response } = require('express');
const multer = require("multer")
const countrymodel = require('../schemas/country-schema')
const categorymodel = require('../schemas/category-schema')
const placemodel = require('../schemas/place-schema')
const imagemodel = require('../schemas/image-schema')
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
router.post('/countryadd', upload.single('image'), (req, res)=>{
    console.log(req.file);
    var x = new countrymodel();
    x.name =req.body.name;
    x.image = req.file.filename;
    x.about = req.body.about;
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
    x.about = req.body.about;
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
router.get('/categorydelete', jsonParser,(req,res)=>{

    categorymodel.find({}, function(err, category){
        res.render('categorydelete', {
            items : category,
        })
    })
})
router.post('/catdelpost', jsonParser, (req, res)=>{

    categorymodel.find({}, function(err, category){

    })
})
router.get('/imgadd', jsonParser,(req,res)=>{

    placemodel.find({}, function(err, place){
        res.render('imgadd', {
            places : place
        })
    })
})
router.post('/imgadd', upload.single('image'),(req,res)=>{
    var x = new imagemodel();
    console.log(req.body.name);
    x.name =req.body.name;
    x.place = req.body.place;
    console.log(x.place);
    console.log("________");
    console.log(req.body.file);
    console.log(req.body.image);
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
router.use("/categoryadd", function(request, response){
    response.render("categoryadd", {})
});
router.use("/countryadd", function(request, response){
    response.render("countryadd", {})
});
module.exports = router;
