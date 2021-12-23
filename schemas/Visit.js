const {Schema, model} = require('mongoose')


const Visit = new Schema({    
    visitedPlace: {
        type: Boolean,
        default: false
    },
    wantToVisit: {
        type: Boolean,
        default: false
    },
    place: [{
        type: Schema.Types.ObjectId,
        ref: 'place'
    }],
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
})

module.exports = model('Visit', Visit)