const { userSchema, guestUserSchema } = require('../../validation/inputData');
const { userCheck, guestUser } = require("../../../schema/newUserCheck");
const { usermodel } = require('../../../schema/dbSchema');
const { signedCookie } = require('cookie-parser');
const sendEmail = require('../../../email/email');
module.exports.signupController = (req , res )=>{

    console.log('signed cookie is :   ' , signedCookie);
    console.log('cookies :', req.cookies);
    const { username, email, password } = req.body;
    userSchema(username, email, password)
        .then((result) => {
            console.log(result)
            if(!result) {
                return res.status(208)
                .header({'Content-Type' : 'application/json'})
                .json({ status: 0 , msg : 'data not valid' });
            } else {
                //if user have valid data next middlewear call
                console.log("next called")
                saveUser(req,res);
            }
        })
        .catch((err) => {
            console.log('err message............................' , err);
            return res.status(208)
            .header({'Content-Type' : 'application/json'})
            .json({status : 0 , msg : 'data not valid'})
        });
}
async function saveUser (req, res){
    const { username, email, password } = req.body;
    //try to save user in databsae 
     await userCheck(username, email, password)
        .then(result => {
            console.log(result)
            if(!result){
                //if user submited with same name the userCheck function
                // return false  
                return res.status(208)
                .header({'Content-Type' : 'application/json'})
                .json({ status: 0, msg: "user Exsit !" });
            } else {
             res
                .status(201)
                .header({ 'Content-Type': 'application/json' })
                .cookie('pooriya', result.Access_token, { secure: true, maxAge: 500 * 500 })
                .json({ status: 1, msg: "confirm your email" });
              const hash = sendEmail(email)
                    usermodel.findOneAndUpdate({ email } , { Email_Activation : hash })
                   .then(respon=>{
                       console.log("user for update ....",respon)
                   }).catch(err=>{
                       console.log(err);
                   })
            
            }
        
        }).catch(err =>{
            console.log(err);
                return res.status(208)
                .header({'Content-Type' : 'application/json'})
                .json({ status : 0 , msg : 'unknown Error while creating user' })
        });
}
module.exports.guestSignupController = async (req , res)=>{
    const { username } = req.body;
    await guestUserSchema(username)
        .then(async result => {
            await guestUser(username)
                .then(respn => {
                    if(respn) {
                        return res
                            .status(200)
                            .header({ 'Content-Type': 'application/json' })
                            .cookie('pooriya', respn.Access_token,
                                { secure: true, maxAge: 500 * 500 })
                            .json({ status: 1, msg: 'new guest user created !' })
                    } else {
                        return res
                            .status(203)
                            .header({ 'Content-Type': 'application/json' })
                            .json({ status: 0, msg: 'user Exsit' })
                    }
                }).catch(err => console.log(err))
            console.log('result is ', result);

        }).catch(err => console.log(err))
}
