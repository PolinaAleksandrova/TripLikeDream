const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}
const  countrySchema = mongoose.Schema({
  name: reqString,
  image: reqString,
})

module.exports = mongoose.model('country', countrySchema)
