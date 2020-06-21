const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  googleId: {
    type: String,    
  },
  posts : [
    {type: mongoose.Schema.Types.ObjectId,ref:'Post'}
],
following: [
 { 
    type:String,
    
}
],
followers: [
  {
    type:String,
  }
],
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
