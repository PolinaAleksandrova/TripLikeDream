var { Router, Request, Response } = require('express');
const router = Router();
const authMiddleware = require('../middlewaree/authMiddleware')
const User = require('../schemas/User')
const Comment = require('../schemas/Comment')
const Visit = require('../schemas/Visit')
const placemodel = require('../schemas/place-schema')

router.get('/personalArea', authMiddleware, async (req,res)=>{
    var validation = false
    var token = req.cookies.auth
    if(token){
        validation = true;
    }
    const user = await User.findOne({_id: req.user.id}).lean();
    if(user.roles == 'USER')
    {
        console.log("Вход Пользователя")
    }
    else
    {
    console.log("Вход Администратора")
    res.redirect("/admin")
    }
    const Comments = await Comment.find({user: req.user.id})
    .populate({
        path: 'place',
        populate: [{
            path: 'country'
        }]
    })
    .lean()
    var visits = await Visit.find({user: user._id,  visitedPlace: true})
    .lean();
    var placeMass = [visits.length]
        // console.log(visits)
    for (var i in visits){
        await placemodel.findOne({_id: visits[i].place})
        .then(place => {
            console.log(place)
                placeMass[i] = place
        })
        .catch(err => console.log('Caught:', err.message));
    }
    // console.log("place " + placeMass[0].name)
    const lastComment = Comments[Comments.length - 1]
    var check = false
    var lastName = user.lastName
    var firstName = user.firstName
    var countCountry = user.countCountry
    var countComments = user.countComments
    var countryName
    var placeName
    var contentComment
    if(lastComment){
        check = true
        countryName = lastComment.place[0].country.name
        placeName = lastComment.place[0].name
        contentComment = lastComment.content
    }
    // console.log(check)
    res.render('personalArea', {validation, lastName, firstName, countCountry, countComments, countryName, placeName, contentComment, check, placeMass});
})

module.exports = router;
