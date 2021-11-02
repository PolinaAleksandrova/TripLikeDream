//4fqtKZ622IuwsqW3
const mongoose = require('mongoose')
const mongoPath ='mongodb+srv://TLDuser:4fqtKZ622IuwsqW3@mongodbtld.ktryg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  return mongoose
}
