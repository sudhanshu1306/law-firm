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
    queF1:String,
    queF2:String,
    quef3:String,
    quef4:String,
    queG1:String,
    queG2:String,
    queG3:String,
    queG4:String,
    queH1:String,
    queH2:String,
    queH3:String,
    queH4:String,
    queI1:String,
    queI2:String,
    queI3:String,
    queI4:String,
    queJ1:String,
    queJ2:String,
    queJ3:String,
    queJ4:String,
    queK1:String,
    queK2:String,
    queK3:String,
    queK4:String,
    queL1:String,
    queL2:String,
    queL3:String,
    queL4:String,
    queM1:String,
    queM2:String,
    queM3:String,
    queM4:String,
    queN1:String,
    queN2:String,
    queN3:String,
    queN4:String,
    queO1:String,
    queO2:String,
    queO3:String,
    queO4:String,
    queP1:String,
    queP2:String,
    queP3:String,
    queP4:String,
    queQ1:String,
    queQ2:String,
    queQ3:String,
    queQ4:String,
    queR1:String,
    queR2:String,
    queR3:String,
    queR4:String,
    queS1:String,
    queS2:String,
    queS3:String,
    queS4:String,
    queT1:String,
    queT2:String,
    queT3:String,
    queT4:String,
    queU1:String,
    queU2:String,
    queU3:String,
    queU4:String,
    queV1:String,
    queV2:String,
    queV3:String,
    queV4:String,
    queW1:String,
    queW2:String,
    queW3:String,
    queW4:String,
    queX1:String,
    queX2:String,
    queX3:String,
    queX4:String,
    queX1:String,
    queX2:String,
    queX3:String,
    queX4:String,
    queY1:String,
    queY2:String,
    queY3:String,
    queY4:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports=mongoose.model('Sra',sraSchema);