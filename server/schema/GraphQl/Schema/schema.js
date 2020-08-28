const { buildSchema } = require('graphql');

const usersSchema = (`

		type users {
			email : String
		}
`) 
module.exports = usersSchema