const express = require('express');
import userRouter from './api/users';
import authRouter from './api/auth';

export const initializeRoutes = app =>{

  app.use('/auth',authRouter);  
  app.use('/profil',userRouter);  


};
