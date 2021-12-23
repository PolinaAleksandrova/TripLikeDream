const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}
const  placeSchema = mongoose.Schema({
  name: reqString,
  country: {type: mongoose.Schema.Types.ObjectId, ref: 'country'},
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
  about: String,
})

module.exports = mongoose.model('place', placeSchema)
