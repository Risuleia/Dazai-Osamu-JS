const { dare } = require('../../Utilities/questions.js')

module.exports = {
	name: 'dare',
	aliases: ['dr'],
	usage: '[1/2/3] for difficulty',
	description: 'Sends a truth/dare challenge.',
	execute: async (client, message, args, db) => {

		dare(message, args[0])
		
	}
}