const express = require('express');
const router = express.Router();
import postsRouter from './api/posts';
import userRouter from './api/users';

export const initializeRoutes = app =>{

  app.use('/posts',postsRouter);  
  app.use('/users',userRouter);  


};
