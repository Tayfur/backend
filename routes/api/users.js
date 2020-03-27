const express = require('express');
const router = express.Router();
const userController = require('../../controller/users/users');
const auth = require('../../middlewares/auth');


//sign up 
router.post('/login',userController.user_login);
router.post('/sign',userController.user_sign);
//currently profile
router.get('/me',auth,userController.user_me);
router.get('/me/posts',auth,userController.user_meposts);
//other users 
router.get('/:username',auth,userController.user_profiles);
router.get('/:username/posts',auth,userController.user_posts);





module.exports = router;