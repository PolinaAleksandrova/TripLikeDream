const mongoose = require('mongoose')
const mongoPath ='mongodb+srv://TLDuser:4fqtKZ622IuwsqW3@mongodbtld.ktryg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async function connect(){
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log('>>> Database is running')
  return mongoose
}
