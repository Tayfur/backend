const mongoose = require('mongoose');
const Post = require('../../models/db/post');
const User = require('../../models/db/user');


exports.post_all_list = (req,res,next)=>{
    
    Post.find()
    .select('title content auth created_at _id discription')
    .exec()
    .then(docs=>{
    const response={
        count:docs.length,
        posts:docs.map(doc=>{
            return {

                 
                title:doc.title,
                content:doc.content,
                discription:doc.discription,
                _id:doc._id,
                created_at:doc.created_at,
                auth:doc.auth,
                request:{
                    type:'GET',
                    url:'http://localhost:3008/posts/'+doc._id,
                    
                }
            }
        })
    };
      res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.post_add_list = (req,res,next)=>{
    const post=new Post({
        _id:new mongoose.Types.ObjectId(),
        title: req.body.title,
        content: req.body.content,
        discription: req.body.disc,
        auth:req.user.id,
      
    });
    post.save().
        then(result=>{
            console.log(result);
            res.status(201).json({
                createdPost: {
                    title:result.title,
                    content:result.content,
                    _id:result._id,
                    discription:result.discription,
                    auth:result.auth,
                    created_at: new Date(),
                    request:{
                        type:'GET',
                        url:'http://localhost:3008/posts/'+result._id
                    }
                }
            });
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err});
        });
       
    
};

exports.post_show = (req,res,next)=>{
    const id =req.params.postId;
    Post.findById(id)
    .select('title content _id created_at')
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc){
            res.status(200).json({
                post:doc,
                request:{
                    type:'GET',
                    url:'http://localhost:3008/posts/'+doc._id,

                }
            })
        }else{
            res.status(404).json({message:'no valid entry'});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.post_delete = (req,res,next)=>{
    const id = req.params.postId;
    const name = req.user.name;
    Post.remove({ _id: id })
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'post deleted',
            request:{
                type:'POST',
                url:'http://localhost:3008/posts/',
                body:{title:'String',content:'String'}
    
            }
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    

};

exports.post_sameposts = (req,res,next)=>{

    const id =req.params.postId;
    Post.findById(id)
    .select('title content _id created_at discription')
    .exec()
    .then(doc=>{
        console.log("from database",doc);
        if(doc){
         disc=doc.discription;
         Post.find({discription:doc.discription},(err,Post)=>{
            res.status(200).json(Post);
   
         })

        }else{
            res.status(404).json({message:'no valid entry'});
        }
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
};
exports.post_search  =(req,res,next)=>{

    Post.find()
    .select('title content created_at _id')
    .exec()
    .then(docs=>{
        search = req.body.search;
        Post.find({ title:search}, (err, Post) => {
            if(Post.length==0){res.status(500).json({message:'not found'})}
            else{
                res.status(200).json(Post);
            }
        });
    {}
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            message:'not found'
        });
    });   

};
