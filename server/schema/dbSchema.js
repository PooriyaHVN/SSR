const mongoose = require('mongoose');
const users = mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	createTime : {
		type: Date,
		default : Date.now
	},
	Access_token:{
		type : String,
		required : true
	},
	Email_Activation : String
});
const usermodel = mongoose.model('users' , users);

const guestUser = mongoose.Schema({
	name : {
		type :String,
		required : true
	},
	createTime : {
		type : Date,
		default : Date.now
	},
	Access_token : {
		type : String,
		required : true
	}
});

const guestUserModel = mongoose.model('guestUser', guestUser);
module.exports = {usermodel , guestUserModel};

