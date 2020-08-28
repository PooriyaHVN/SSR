const mongoose = require('mongoose');


if(process.env.NODE_ENV === 'production'){

	 mongoose.connect(`
	${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST_IP}:27017/${process.env.DB_NAME}` 
	, {useNewUrlParser : true , useUnifiedTopology: true });

	}else{
	   mongoose.connect('mongodb://localhost:27017/porttfilio',{useNewUrlParser : true , useUnifiedTopology: true });
	}

const db = mongoose.connection;

db.on('error' , (err)=>{
	console.error(`Error While Connection to the DB ${err}`)
});
db.once('open' , ()=>{
	console.log('database Connected');
});
