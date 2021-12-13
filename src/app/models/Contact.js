const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
   },
   telephone: 
   [
      {
         type: String,
         required: true,
      }
   ],
   address: 
   [{
      zipcode: {
         type: String,
         required: true,
       },
       street: {
         type: String,
         required: true,
       },
       number: {
         type: String,
         required: true,
       },
       district: {
         type: String,
         required: true,
       },
       state: {
         type: String,
         required: true,
       },
       city: {
         type: String,
         required: true,
       },
       complement: {
         type: String,
         required: false,
       }
   }],
   user: {
      type: mongoose.ObjectId,
      ref: 'User',
      required: true
   },
   group: {
      type: mongoose.ObjectId,
      ref: 'Group',
      required: true
   }
})

module.exports = mongoose.model('Contact', esquema, 'contacts')