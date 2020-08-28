const { usermodel, guestUserModel } = require("../../schema/dbSchema");
const bcrypt = require('bcryptjs');
async function LoginUser(info , password) {
    try{
   return await usermodel.findOne({ email : info })
    .then(async data=>{
        console.log(data)
        if( data === null){
             await usermodel.findOne({ username : info })
            .then(async result=>{
                if(result=== null){
                    return Promise.reject('user not found')
                }else{
                    return await bcrypt.compare(password, result.password)
                        .then(result => {
                            if(result) {
                                return Promise.resolve("user found")
                            } else {
                                return Promise.reject('password or info is wrong')
                            }
                        }).catch(err => console.log(err))
                }
            })
        }else{
           return await bcrypt.compare(password, data.password)
            .then(result=>{
                if(result){
                    return Promise.resolve("user found")
                }else{
                    return Promise.reject('Password or info is wrong')
                }
            }).catch(err=>console.log(err))
        }
    }).catch(err=>console.log(err))
 }catch(err){
     console.log(err);
     return false
 }
}

async function LoginGuestUser(name) {
    try{
        return await guestUserModel.findOne({name})
        .then(data=>{
        if(data === null){
            return Promise.reject('no guest user found')
        }else{
            return Promise.resolve("guest user found");
        }
    }).catch(err=>console.log( err ))
}catch(err){
    console.log(err);
    return false 
}
}
module.exports = { LoginUser , LoginGuestUser }