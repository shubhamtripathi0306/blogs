const mongoose = require('mongoose');


const authorSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true  
    },
    password:{
        type:String,
        required:true
    }

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
