const dbSchema = require('../../dbSchema');
const root = {
	email : ()=> {
		dbSchema.find({ email } , (err,data)=>{
			if(err)throw err;
			console.log(data);
		})
	}
}

module.exports = root