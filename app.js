const express = require("express");
const app = express();
var path = require("path");
const mongoose = require('mongoose')
const multer = require("multer");
const countrymodel = require('./schemas/country-schema')

app.set("view engine", "pug");
var jsonParser = express.json();
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
app.use(express.static("uploads"));
console.log(__dirname);
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

app.get('/', jsonParser,(req,res)=>{

    countrymodel.find({}, function(err, docs){

        res.render('index', {
            items : docs
        })
})
})

app.use("/CountryAdd", function(request, response){
    response.render("countryadd", {})
});

app.listen(3000);
