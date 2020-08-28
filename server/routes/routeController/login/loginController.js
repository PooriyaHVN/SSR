const { LoginUserSchema, LoginGuestUserSchema } = require('../../validation/inputData');
const { LoginUser, LoginGuestUser } = require('../../validation/Signin');

module.exports.loginController = (req ,res)=>{
	 const { info , password } = req.body;
    LoginUserSchema(info , password)
    .then(result =>{
        if(result){
            LoginUser(info, password)
            .then(isLogged=>{
                if(isLogged){
                  console.log(isLogged);
                return res
                .status(200)
                .header({ 'Content-Type' : 'application/json' })
                .cookie('pooriya' , isLogged.Access_token , { secure : true , maxAge : 500 * 500 })
                .redirect('/')
            }else{
                return res
                .status(203)
                .header({ 'Content-Type': 'application/json' })
                .json({ status: 0, msg: 'User Not Found !' })
            }
        }).catch(err=>console.log(err))
    }else{
        return res
          .status(400)
          .header({ "Content-Type": "application/json" })
          .json({ status: 0, msg: "Data is invalid" });
    }
    }).catch(err =>{
        console.log(err);
        return res
        .status(400)
        .header({ "Content-Type": "application/json" })
        .json({ status: 0, msg: "Data is invalid" });
    })
}

module.exports.guestLoginController = (req, res)=>{
	  const { name } = req.body;
    LoginGuestUserSchema(name)
    .then(resp=>{
        if(resp){
              LoginGuestUser(name)
                .then((result) => {
                  if (result) {
                    return res
                      .status(200)
                      .header({ "Content-Type": "application/json" })
                      .cookie("pooriya", result.Access_token, {
                        secure: true,
                        maxAge: 500 * 500,
                      })
                      .redirect("/")
                  } else {
                    return res
                        .status(203)
                        .header({ "Content-Type": "application/json" })
                        .json({ status: 0, msg: "Guest User Not Found" });
                  }
                })
                .catch((err) => console.log(err));
        }else{
            return res
              .status(400)
              .header({ "Content-Type": "application/json" })
              .json({ status: 0, msg: "Data is invalid" });
        }
    }).catch(err=>console.log(err))
}
