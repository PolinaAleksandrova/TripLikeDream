const mongoose = require('mongoose')
const reqString = {
  type: String,
  required: true
}
const userSchema = mongoose.Schema({
  role: String,
  username: reqString,
  email: reqString,
  password: reqString,
})

module.exports = mongoose.model('users', userSchema)
