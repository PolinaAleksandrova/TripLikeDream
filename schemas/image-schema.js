const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}
const  imageSchema = mongoose.Schema({
  name: reqString,
  place: {type: mongoose.Schema.Types.ObjectId, ref: 'place'},
  image: reqString,
})

module.exports = mongoose.model('image', imageSchema)
