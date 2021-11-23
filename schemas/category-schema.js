const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}
const  categorySchema = mongoose.Schema({
  name: reqString
})

module.exports = mongoose.model('category', categorySchema)
