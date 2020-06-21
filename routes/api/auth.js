const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth');

const auth = require('../../middlewares/auth');

//sign up 
router.post('/login',authController.user_login);
router.post('/sign',authController.user_sign);
module.exports = router;