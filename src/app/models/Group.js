const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   user: {
    type: mongoose.ObjectId,
    ref: 'User',
    required: true
 }
})


module.exports = mongoose.model('Group', esquema, 'groups')