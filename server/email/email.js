const mail = require('nodemailer');
const bcrypt = require('bcryptjs');

module.exports =  (email)=>{
 const config = mail.createTransport({
		host : 'smtp.gmail.com',
		port : 587,
		secure : false,
		auth : {
			user : `${ process.env.ADMIN_EMAIL }`,
			pass : `${ process.env.DB_PASSWORD }`
		},
	});
	try{
		console.log("sending email ....")
		const salt = bcrypt.genSaltSync(20);
			const hash = bcrypt.hashSync(email , salt);
			 let send = config.sendMail({
				from : `${ process.env.ADMIN_EMAIL }`,
				to : email,
				subject : `thanks ${ email } for signup to my portfolio website`,
				text : '',
				html : `<div><h1><a href='${ hash }'>confirm your email</a></h1></div>`
			}).then(resp => console.log(resp)).catch(err=>console.log(err))
			
			return hash
		}catch(err){
			console.log("error while sending email" , err);
		}
}
