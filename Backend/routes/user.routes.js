const express = require('express');
const {  signup, loginUser } = require('../controllers/userController');

const router = express.Router();

//login route
router.post('/login', loginUser);
//register route
router.post('/signup', signup);

//export the router

module.exports = router