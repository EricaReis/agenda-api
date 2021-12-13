const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   email: {
      type: String,
      required: true,
      index: {unique: true}
   },
   password: {
    type:  String,
    required: true
 }
})

module.exports = mongoose.model('User', esquema, 'users')