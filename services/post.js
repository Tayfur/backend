import Post from '../models/post';

exports.getbyid = (id)=>{
    const user=Post.findById(id);
      return user;       
     } 
 exports.getbyuser=(id)=>{
     const posts = Post.find({user:id})
     return posts;
  }