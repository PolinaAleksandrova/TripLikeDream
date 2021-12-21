const {Schema, model} = require('mongoose')


const User = new Schema({
    username: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    lastName: {
        type: String
    },
    firstName:{
        type: String
    },
    phoneNumber: {
        type: String
    },
    countCountry: {
        type: Number,
        default: 0
    },
    countComments: {
        type: Number,
        default: 0
    },
    roles: [{
        type: String, 
        ref: 'Role'
    }]
})

module.exports = model('User', User)