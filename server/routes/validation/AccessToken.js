const jwt = require('jsonwebtoken');

function Access_token(...Argomants) {
    return jwt.sign(
     { ...Argomants },
     process.env.SECRET_TOKEN
   );
}
module.exports = Access_token