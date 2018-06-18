'use strict';


const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');


router.post('/signup', UserController.user_register);

router.post('/login', UserController.user_login);


module.exports = router;
