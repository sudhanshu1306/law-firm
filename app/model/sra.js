const User = require('./user');
const mongoose=require('mongoose');
const sraSchema=mongoose.Schema({
    queA1:String,
    queA2:String,
    queA3:String,
    queA4:String,
    queB1:String,
    queB2:String,
    queB3:String,
    queB4:String, 
    queC1:String,
    queC2:String,
    queC3:String,
    queC4:String, 
    queD1:String,
    queD2:String,
    queD3:String,
    queD4:String, 
    queE1:String,
    queE2:String,
    queE3:String,
    queE4:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports=mongoose.model('Sra',sraSchema);