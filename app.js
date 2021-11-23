const express = require("express")
const app = express()
var path = require("path")
const mongoose = require("mongoose")
const multer = require("multer")
var bodyParser = require("body-parser")
const countrymodel = require('./schemas/country-schema')
const categorymodel = require('./schemas/category-schema')
const placemodel = require('./schemas/place-schema')
app.set("view engine", "pug");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var jsonParser = bodyParser.json({ extended: false });
const mongoPath ='mongodb+srv://TLDuser:4fqtKZ622IuwsqW3@mongodbtld.ktryg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoPath, {
useNewUrlParser: true,
useUnifiedTopology: true
})
var upload = multer ({
    storage: multer.diskStorage ({
        destination: (req, file, cb)=>{
            cb (null, "./uploads")
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        }
    })
})
app.use(express.static("uploads")) ;
app.post('/post', upload.single('image'), (req, res)=>{
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
app.post('/categorypost', jsonParser, (req, res)=>{

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
app.post('/placepost', jsonParser, (req, res)=>{

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
app.get('/', jsonParser,(req,res)=>{

    countrymodel.find({}, function(err, docs){

        res.render('index', {
            items : docs
        })
})
})
app.get('/placeadd', jsonParser,(req,res)=>{

    countrymodel.find({}, function(err, docs){
    categorymodel.find({}, function(err, documents){
        res.render('placeadd', {
            items : docs,
            categories: documents
        })
})
})
})

app.use("/categoryadd", function(request, response){
    response.render("categoryadd", {})
});

app.use("/countryadd", function(request, response){
    response.render("countryadd", {})
});

app.listen(3000);
