const mongoose = require('mongoose');
const User = require('./user');
const Application = require('./application');

const referenceSchema = mongoose.Schema({
    name : String,
    specialization : String,
    user : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'User'
  },
  duration:String,
  document:String
});

module.exports = mongoose.model('Reference',referenceSchema);