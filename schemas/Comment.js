const {Schema, model} = require('mongoose')


const Comment = new Schema({    
    content: {
        type: String
    },
    place: [{
        type: Schema.Types.ObjectId,
        ref: 'place'
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = model('Comment', Comment)