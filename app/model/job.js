const mongoose = require('mongoose');
const User = require('./user');
const Application=require('./application');
const jobSchema = mongoose.Schema({
    title : String,
    company:String,
    experience:String,
    salary:String,
    venue:String,
    info : String,
    jobType:String,
    area:String,
    approved : {type : Number, default : 0},
    employer : {type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
       },
    applied : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'Application'
  }],
  skillsRequired:[String],
  skillsDeveloped:[String],
  accepted : [{
    type :  mongoose.Schema.Types.ObjectId,
    ref : 'Application'
}]
},{timestamps:true})
module.exports = mongoose.model('Job',jobSchema);
