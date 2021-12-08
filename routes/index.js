var { Router, Request, Response } = require('express');
const countrymodel = require('../schemas/country-schema')
var placemodel = require('../schemas/place-schema')
var imagemodel = require('../schemas/image-schema')
var bodyParser = require("body-parser")
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
router.get('/country/place/:place', jsonParser,(req,res)=>{
    placemodel.findOne({name: req.params["place"]})
    .then(async place => {
        await imagemodel.find({place: place._id})
        .then(image => {
            res.render('place', {
                places: place,
                imges: image
            })
        })
        .catch(err => console.log('Caught:', err.message));
    })
})
module.exports = router;
