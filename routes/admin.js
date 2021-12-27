
var { Router, Request, Response } = require('express');
const multer = require("multer")
const countrymodel = require('../schemas/country-schema')
const categorymodel = require('../schemas/category-schema')
const placemodel = require('../schemas/place-schema')
const imagemodel = require('../schemas/image-schema')
var Comment = require('../schemas/Comment')
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
            res.redirect('listCountry')
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
    x.geo = req.body.geo;
    x.save((err, doc)=>{
        if(!err){
            console.log('saved succesfully')
            res.redirect('listPlace')
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
router.get('/listPlace', async(req,res)=>{
    var places = await placemodel.find().populate({path: 'country'}).populate({path: 'category'}).lean();
    res.render('listPlace', {places})
})
router.route('/editPlace/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        const place = await placemodel.findById(id).lean();
        const countries = await countrymodel.find().lean();
        const categories  = await categorymodel.find().lean();
        res.render('editPlace', { place, countries, categories });
    })
    .post(async (req, res) => {
        const { id } = req.params;
        const { name, category, country, geo, about} = req.body;
        await placemodel.findByIdAndUpdate(id, {
            name, category, country, about, geo
        }).lean();
        res.redirect('/admin/listPlace');
    })
router.get('/deletePlace/:id', async(req,res)=>{
    const { id }= req.params;
    await placemodel.findByIdAndDelete(id);
    res.redirect('/admin/listPlace')
})
router.get('/listCategory', async(req,res)=>{
    var categories = await categorymodel.find().lean();
    res.render('listCategory', {categories})
})
router.route('/editCategory/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        const category = await categorymodel.findById(id).lean();
        res.render('editCategory', { category });
    })
    .post(async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        await categorymodel.findByIdAndUpdate(id, {
            name
        }).lean();
        res.redirect('/admin/listCategory');
    })
router.get('/deleteCategory/:id', async(req,res)=>{
    const { id }= req.params;
    await categorymodel.findByIdAndDelete(id);
    res.redirect('/admin/listCategory')
})
router.get('/listCountry', async(req,res)=>{
    var countries = await countrymodel.find().lean();
    res.render('listCountry', {countries})
})
router.get('/deleteCountry/:id', async(req,res)=>{
    const { id }= req.params;
    await countrymodel.findByIdAndDelete(id);
    res.redirect('/admin/listCountry')
})
router.route('/editCountry/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        const country = await countrymodel.findById(id).lean();
        res.render('editCountry', { country });
    })
    .post(async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        await countrymodel.findByIdAndUpdate(id, {
            name
        }).lean();
        res.redirect('/admin/listCountry');
    })
router.get('/listComment', async(req,res)=>{
    var comments = await Comment.find().populate({path: 'place'}).populate({path: 'user'}).lean();
    console.log(comments[0].place[0].name)
    res.render('listComment', {comments})
})
router.get('/deleteComment/:id', async(req,res)=>{
    const { id }= req.params;
    await Comment.findByIdAndDelete(id);
    res.redirect('/admin/listComment')
})
router.use("/categoryadd", function(request, response){
    response.render("categoryadd", {})
});
router.use("/countryadd", function(request, response){
    response.render("countryadd", {})
});

module.exports = router;
