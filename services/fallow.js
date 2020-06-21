
import User from '../models/user';

exports.fallow = (id)=>{
    return ' hello'     
     } 
 exports.isfallowing=(id)=>{
    const isfallow =  User.findById(id);
return isfallow
  }
  exports.unfallow=(id)=>{
    const posts = Post.find({user:id})
    return posts;
 }