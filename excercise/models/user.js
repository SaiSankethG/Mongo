const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        requried:true
    },
    lastname:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    betaUser:{
        type:Boolean,
        default:false
    },
    pets:[{type:String}],
    addess:{
        houseNumber: Number,
        street: String,
        city: String,
        State: String,
        zip: Number,
        other:Boolean
    }

})

module.exports = mongoose.model('User' , userSchema)