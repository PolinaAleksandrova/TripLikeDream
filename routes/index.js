var { Router, Request, Response } = require('express');
const countrymodel = require('../schemas/country-schema')
var placemodel = require('../schemas/place-schema')
var imagemodel = require('../schemas/image-schema')
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
var places;
var mas;
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

    /*var countryi;
     countrymodel.findOne({name:req.params["country"]}, function(err, countryfind){
        countryi = countryfind.toObject();
            placemodel.find({country: countryi._id}, async function(err, place){
                var mass = [place.length];
                for (var i in place){
                    await imagemodel.findOne({place: place[i]._id}, function(err, image){

                mass[i] = image
                console.log(mass)
    })
    }

                console.log(mass)
                console.log(mass.length)

                await res.render('country', {
                items : place,
                country : countryfind,
                img: mass
        })


})
})*/
module.exports = router;
