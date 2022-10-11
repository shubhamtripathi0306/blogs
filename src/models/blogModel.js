const mongoose = require('mongoose');
const ObjectId= mongoose.Schema.Types.ObjectId


const blogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    body: { type: String, required: true },
    authorId: { 
        type:ObjectId,
        ref:"blogAuthor" 
    },
    category:[{type:String}],
    isDeleted: { type:Boolean, default: false },
    isPublished: { type:Boolean, default: true }
},{ timestamps: true });

module.exports = mongoose.model('Blog', blogSchema)
