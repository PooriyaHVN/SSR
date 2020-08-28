const { usermodel , guestUserModel } = require('./dbSchema.js');
const bcrypt = require('bcryptjs');
const Access_token = require('../routes/validation/AccessToken.js');

async function userCheck(username , email , password){
	try {
    const newusermodel = await usermodel.findOne({ email });
    if (newusermodel === null) {
      const salt = bcrypt.genSaltSync(10);
      const token = Access_token(username, email, password);
      const hashPassword = bcrypt.hashSync(password, salt);

      const newuser = new usermodel({
        username,
        email,
        password: hashPassword,
        Access_token: token,
      });
      return newuser.save();
    } else {
      console.log(`user is submited`);
      return false;
    }
  } catch (error) {
	  console.log(error);
	  return false
  }
}




async function guestUser(name){
	try {
    const newuser = await guestUserModel.findOne({ name });
    const token = Access_token(name);
    if (newuser === null) {
      const newGuestuser = new guestUserModel({
        name,
        Access_token: token,
      });
      return newGuestuser.save();
    } else {
      return false;
    }
  } catch (error) {
	  console.log(err);
	  return false
  }
} 
module.exports = {userCheck , guestUser}