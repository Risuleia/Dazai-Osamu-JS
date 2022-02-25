const { hye } = require('../../Utilities/questions.js')

module.exports = {
	name: 'haveyouever',
	aliases: ['hye'],
	description: 'Ask a "Have you ever" question.',
	execute: async (client, message, args, db) => {

		hye(message)
		
	}
}