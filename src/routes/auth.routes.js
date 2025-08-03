const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const {registerController, loginController} = require('../controllers/auth.controller');
const router = express.Router();


//PostRegister
router.post('/register',registerController)
router.post('/login',loginController )


//PostLogin

//Get user[Protected]






module.exports = router;    