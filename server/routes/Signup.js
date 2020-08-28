const router = require('express').Router();
const { guestSignupController ,signupController } = require('./routeController/signup/signupController')

router.post('/addUser', signupController);

router.post('/addGuest', guestSignupController );

module.exports = router