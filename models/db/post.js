const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
title:{type:String,required:true},
content:{type:String,required:true},
discription:{type:String,required:true},
auth:{type:String,required:true},

created_at :{ type: Date, required: true, default: Date.now },
});
module.exports = mongoose.model('Post',postSchema);
    