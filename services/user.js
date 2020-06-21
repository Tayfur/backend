import User from '../models/user';

exports.getbyusername = (username)=>{
   const user=User.findOne({username:username});
    return user;
    }
exports.getbyid = (id)=>{
  const user=User.findOne({id:id});
    return user;       
   } 
exports.getbyemail = (email)=>{
   const user=User.findOne({email:email});
    return user;    
   }
