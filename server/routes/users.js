const router = require('express').Router();

const Login = require('./Login.js');
const Signup = require('./Signup');
//use login route
router.use('/Login' , Login);
//use signup route
router.use('/Signup' , Signup)

module.exports = router;
