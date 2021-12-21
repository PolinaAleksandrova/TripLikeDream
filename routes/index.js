var { Router, Request, Response } = require('express');
const countrymodel = require('../schemas/country-schema')
var placemodel = require('../schemas/place-schema')
var imagemodel = require('../schemas/image-schema')
var bodyParser = require("body-parser")
var Comment = require('../schemas/Comment')
var User = require('../schemas/User')
const authMiddleware = require('../middlewaree/authMiddleware');
const { findOneAndUpdate } = require('../schemas/Comment');
var jsonParser = bodyParser.json({ extended: false });
const router = Router();

var places;
var mas;
router.get('/', jsonParser,(req,res)=>{
    countrymodel.find({}, function(err, docs){
        res.render('index', {
            items : docs
        })
    })
})
router.get('/country/:country', jsonParser,async(req,res)=>{
    countrymodel.findOne({name:req.params["country"]})
    .then(country => {
        placemodel.find({country: country._id})
        .then(async place => {
            mas = [place.length];
            for (var i in place){
                await imagemodel.findOne({place: place[i]._id})
                .then(image => {
                    mas[i] = image
                })
                .catch(err => console.log('Caught:', err.message));
            }
            places = place;
            return places;
        })
        .then(place => {
            console.log("country._id " + country._id)
            console.log("place " + place)
            console.log("mas " + mas)
            console.log("id " + mas[0].image)
            res.render('country', {
                country : country,
                places: place,
                imges: mas
            })
        })
        .catch(err => console.log('Caught:', err.message));
    })
    .catch(err => console.log('Caught:', err.message));
})
router.route('/country/place/:place')
.get(jsonParser,(req,res)=>{
    placemodel.findOne({name: req.params["place"]})
    .then(async place => {
        const comments = await Comment.find({place: place._id}).populate({ path: 'user' }).lean();
        console.log(comments[0].user[0].lastName)
        imagemodel.findOne({place: place._id})
        .then(image => {
            res.render('place', {
                comments: comments,
                place: place,
                image: image
            })
        })
        .catch(err => console.log('Caught:', err.message));
    })
})
.post(authMiddleware, async (req,res)=>{
    const { content } = req.body;
    const place = await placemodel.findOne({name: req.params["place"]}).lean(); 
    const placeID = place._id
    const user = req.user.id;
    const users = await User.findOne({"_id": user}).lean();
    const update = { countComments: users.countComments + 1};  
    const filter = { _id: user}
    const temp = await User.findOneAndUpdate(filter, update).lean();
    console.log(temp);
    const newComment = new Comment({ content, place: placeID, user });
    console.log(newComment);
    await newComment.save();
    res.redirect('#');
})
module.exports = router;
