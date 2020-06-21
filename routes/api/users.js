const express = require('express');
const router = express.Router();
const userController = require('../../controller/users');
import passport from 'passport';

const auth = require('../../middlewares/auth');
//currently profile
///////me/////////
router.get('/me', auth, userController.userMe);
router.post('/add', auth, userController.addPost);
router.post('/:username/follow', auth, userController.follow)
router.post('/:username/unfollow', auth, userController.unfollow)
////////////users///////////////
router.get('/:username', userController.member)
router.get('/:username/post', userController.getAllPostByUser)
////////////posts////////
router.get('/post/:id', userController.showPost);
router.post('/post/:id/like', auth, userController.postLike),
router.get('/home/posts', auth, userController.showHomePage)
router.delete('/post/:id/delete',auth , userController.deletePost)
module.exports = router; ``