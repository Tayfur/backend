const mongoose = require('mongoose');
const User = require('../models/user');
const express = require("express");
const Post = require('../models/post');
import userServices from '../services/user';
import postServices from '../services/post';
import fallowServices from '../services/fallow';
import { DocumentProvider } from 'mongoose';

////////////users////////////
exports.member = async (req,res,next)=>{
  const name = req.params.username;
try {
  let Checkuser= await userServices.getbyusername(name)
if(Checkuser){

  await userServices.getbyusername(name)
  .select('createdAt posts following followers _id username email')
  .then(doc=>{
      const user={ 
        id:doc._id,
        username:doc.username,
        email:doc.email,
        posts:doc.posts,
        following:doc.following,
        followers:doc.followers,
        postCounter:doc.posts.length,
        followingCounter:doc.following.length,
        followersCounter:doc.followers.length,
      }
      res.status(200).json({user});
    })
  }else{
    res.status(404).json({error:'user is doesnt exist'})
  }
}catch (e) {
  console.error(e);
  res.status(500).json({
  message: "Server Error"
  });
} 
};

exports.getAllPostByUser = async (req,res,next)=>{
  try {
    const name = await req.params.username;
    let user   = await userServices.getbyusername(name)
    let post_auth_id =await user.id;
    console.log(post_auth_id)
    await Post.find({user:post_auth_id})
    .select('title user _id  updatedAt ')
    .exec()
    .then(docs=>{
    const response={
    count:docs.length,
    posts:docs.map(doc=>{
    return {
    tweet:doc.tweet,
    _id:doc._id,
    created_at:doc.createdAt,
    user:doc.user,
    request:{
    type:'GET',
    url:'http://localhost:3000/profil/post/'+doc._id,      
            }
          }
        })
      };
     res.status(200).json(response);
 }) 
}catch (e) {
  console.error(e);
  res.status(500).json({
    message: "Server Error"
  });
  } 
  
};
/////////////////posts//////////////// 
exports.showPost = async (req,res,next)=>{
  const { id }   = req.params;
  const post     = await Post.findById(id);
  const user     = await User.findById(post.user);
  const username = await user.username;
   try {
    await Post.findById(id)
    .then(doc=>{
      const post={
        id:doc._id,
        tweet:doc.tweet,
        user:username,
        likeCounter:doc.like.length,
      }
      res.status(200).json({post:post})   

    })

      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      } 
   
};

  exports.postLike = async (req,res,next)=>{
  
    const postId         = req.params.id;
    const post           =await Post.findById(postId);
    const user           =await User.findById(req.user.id);
    const islike         =await post.like;
    const checkLike      =await islike.indexOf(user.id);
    console.log(checkLike);
    try {
    if(checkLike===-1) {
      await  Post.update({_id:postId},
      {$addToSet: { like: user._id } });
            
      return res.status(200).json({msg:'liked'})   
    }
    else{
      return res.status(400).json({msg:'you are already like '+postId})
    };
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      } 
   
  };
  exports.deletePost = async (req,res,next)=>{
  const postId = req.params.id;
  const userId= req.user.id;
  const post = await Post.findById(postId);
console.log(userId)
  if(post.user==userId)
  {
    await Post.deleteOne({_id : postId}) ,function (err) {
        if(err) console.log(err);
        res.status(200).json('deleted')
      }
  }
  else{
    res.status(400).json('you can not delete ')
  }
  
  }
/////////////////me///////////////////
exports.userMe = async (req, res, next) => {
  try {

     const doc = await User.findById(req.user.id, 'createdAt posts following followers username email');
   
     const resultpost = doc.posts.map(async element => {
       const post = await Post.findById(element)
       const pushdata=post
      return pushdata
     });
     const result = await Promise.all(resultpost)
     console.log(result)
     const user = {
        id: doc._id,
        username: doc.username,
        email: doc.email,
        posts: result,
        following: doc.following,
        followers: doc.followers,
        postCounter: doc.posts.length,
        followingCounter: doc.following.length,
        followersCounter: doc.followers.length
      }
      res.status(200).json({ user });
      console.log(user)
  
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  }
 };
exports.addPost = async (req,res,next)=>{
  try {
  const id = await req.user.id;
  const { tweet} = req.body;
  const post = await Post.create({
        tweet,
        user:id
  });
  await post.save();
  const userById = await User.findById(id);
  userById.posts.push(post);
  await userById.save();
  
  return res.status(200).json(post)
}catch (e) {
    console.error(e);
    res.status(500).json({
    message: "Server Error"
    });
  } 
    };


exports.follow = async (req,res,next)=>{
  const name           =await req.params.username;
  const anotherUser    =await userServices.getbyusername(name)
  const anotherUserId  =await anotherUser._id;
  const user           =await User.findById(req.user.id);
  const isfollowing    =await user.following;
  const checkFollow    =await isfollowing.indexOf(anotherUserId);
  console.log(checkFollow);
  try {
  if(checkFollow===-1) {
    await User.update({email:req.user.email},
    {$addToSet: { following: anotherUserId } });
    await  User.update({username:name},
    {$addToSet: { followers: user._id } });
          
    return res.status(200).json({msg:'followed'})   
  }
  else{
    return res.status(400).json({msg:'you are already follow '+name})
  };
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    } 
 
  };
  exports.unfollow = async (req,res,next)=>{
    const name            = req.params.username;
    const anotherUser     =await userServices.getbyusername(name)
    const anotherUserId   =await anotherUser._id;
    const user            =await User.findById(req.user.id);
    const isfollowing     =await user.following;
    const checkFollow     =await isfollowing.indexOf(anotherUserId);
    console.log(checkFollow);
try {
  if(checkFollow===-1) {
    return res.status(400).json({msg:'you are not follow '+name})}
  else{
    await User.update({email:req.user.email},
    {$pull: { following: anotherUserId } });
    await  User.update({username:name},
    {$pull: { followers: user._id } });
    
    return res.status(200).json({msg:'unfollow'})   
   };
}catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error"
    });
  } 
  }
  exports.showHomePage = async (req,res,next)=>{
    const user = await User.findById(req.user.id);
    const following =  user.following
    const users ={}
    const posts = {}
    console.log(following.length)

    for (let index = 0; index < following.length; index++) {
  

    }

    for (let index = 0; index < following.length; index++) {
      users=following[index]
      console.log(users)
      const post = await Post.find({user:users})
      posts.post={post}

    }
    res.send(posts)

  }