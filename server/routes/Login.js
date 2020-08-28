const router = require('express').Router();
const { loginController , guestLoginController } = require('./routeController/login/loginController');

router.post('/LoginUser' , loginController);

router.post('/LoginGuestUser' , guestLoginController);


module.exports = router 