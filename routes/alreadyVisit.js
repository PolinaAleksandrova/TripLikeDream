var { Router, Request, Response } = require('express')
const authMiddleware = require('../middlewaree/authMiddleware')
const Visit = require('../schemas/Visit')
const User = require('../schemas/User')
const placemodel = require('../schemas/place-schema')
var bodyParser = require("body-parser")
var jsonParser = bodyParser.json({ extended: false });

const router = Router();

router.post('/', authMiddleware, async(req,res)=>{
    var validation = false
    var token = req.cookies.auth
    console.log(token)
    if(token){
        validation = true;
    }
    console.log("user" + req.user)
    var place = await placemodel.findOne({_id: req.body.place}).lean();
    const user = await User.findOne({_id: req.user.id}).lean();
    if(user != null){
        console.log(place)
        console.log(user)

        var visit = await Visit.findOne({user: user._id, place: place._id})
        if (visit != null){
            visit.visitedPlace = true;
            visit.wantToVisit = false;
            visit.save((err, doc)=>{
                if(!err){
                    console.log('saved succesfully')
                    res.redirect('/')
                } else {
                    console.log(err);
                }
                console.log("visit != null")

            })
        }
        else{
            var newVisit = new Visit()
            newVisit.visitedPlace = true;
            newVisit.wantToVisit = false;
            newVisit.place = place._id;
            newVisit.user = user._id;
            newVisit.save((err, doc)=>{
                if(!err){
                    console.log('saved succesfully')
                    res.redirect('/')
                } else {
                    console.log(err);
                }
            })
        }
    }
    else{
        console.log("Пользователь не авторизован")
    }
})

module.exports = router;
