const mongoose  = require('mongoose');
const PostSchema = new mongoose.Schema({
    tweet:{
        type:String,
        required: '{PATH} is required!'
    },
    like: [
    { 
        type:String,
    }
       ],
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Post',PostSchema);