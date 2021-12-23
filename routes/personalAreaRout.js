var { Router, Request, Response } = require('express');
const router = Router();
const authMiddleware = require('../middlewaree/authMiddleware')
const User = require('../schemas/User')
const Comment = require('../schemas/Comment')


router.get('/personalArea', authMiddleware, async (req,res)=>{
    var validation = false
    var token = req.cookies.auth
    if(token){
        validation = true;
    }
    const user = await User.findOne({_id: req.user.id}).lean();
    const Comments = await Comment.find({user: req.user.id})
    .populate({
        path: 'place',
        populate: [{
            path: 'country'
        }]
    })
    .lean()
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
    console.log(check)
    res.render('personalArea', {validation, lastName, firstName, countCountry, countComments, countryName, placeName, contentComment, check});
})

module.exports = router;
