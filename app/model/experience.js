const User = require('./user');
const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
    jobTitle:String,
    companyName:String,
    location:String,
    duration:String,
    description:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('Experience',experienceSchema);