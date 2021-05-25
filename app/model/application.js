const Job = require('./job');
const User = require('./user');
const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    description:String,
    areaExperience:[String],
    areaInterested:[String],
    que1:String,
    que2:String,
    que3:String,
    que4:String,
    que5:String,
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model('Application',applicationSchema);