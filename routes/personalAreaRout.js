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
    var lastName = user.lastName
    var firstName = user.firstName
    var countCountry = user.countCountry
    var countComments = user.countComments
    res.render('personalArea', {validation, lastName, firstName, countCountry, countComments, lastComment});
})

module.exports = router;
