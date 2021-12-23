var { Router, Request, Response } = require('express');
const router = Router();
const authMiddleware = require('../middlewaree/authMiddleware')
const User = require('../schemas/User')

router.get('/personalArea', authMiddleware, async (req,res)=>{
    const user = await User.findOne({_id: req.user.id}).lean();
    console.log(user);
    var lastName = user.lastName
    console.log(lastName)
    var firstName = user.firstName
    console.log(firstName)
    var countCountry = user.countCountry
    var countComments = user.countComments
    res.render('personalArea', {num: 3, lastName, firstName, countCountry, countComments});
})

module.exports = router;
