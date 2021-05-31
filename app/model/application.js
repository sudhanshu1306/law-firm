const Job = require('./job');
const User = require('./user');
const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    description:String,
    areaExperience:[String],
    areaInterested:[String],
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    experiences:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Experience'
    }]
})
module.exports = mongoose.model('Application',applicationSchema);