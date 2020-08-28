const joi = require('@hapi/joi');

//signup
const userSchema = (username , email , password)=>{ 
    const validateSchema = joi.object({
        username : joi.string().trim()
        .required()
        .max(255)
        .min(5),

        password : joi.string().trim()
        .required()
        .max(1024)
        .min(8),

        email : joi.string().trim()
        .required()
        .email()
        .max(255)
    })
   return validateSchema.validateAsync({ username, email, password });
}

const guestUserSchema = (name)=>{
    const validateSchema = joi.object({
        name : joi.string().trim()
        .required()
        .max(255)
        .min(1)
    });

    return validateSchema.validateAsync({ name });
}

//login
const LoginUserSchema = (info , password)=>{
    const validateSchema = joi.object({
        info : joi.string().trim()
        .required()
        .max(255)
        .min(1),
        password : joi.string()
        .required()
        .min(8)
        .max(1024)
    });
    return validateSchema.validateAsync({ info , password });
}

const LoginGuestUserSchema = (name)=>{
    const validateSchema = joi.object({
        name : joi.string().trim()
        .required()
        .max(255)
        .min(1)
    });
   return validateSchema.validateAsync({ name })
}


module.exports = { userSchema, guestUserSchema , LoginUserSchema , LoginGuestUserSchema } 