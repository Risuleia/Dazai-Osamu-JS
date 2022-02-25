const { truth } = require('../../Utilities/questions.js')

module.exports = {
	name: 'truth',
	aliases: ['tr'],
	usage: '[1/2/3] for difficulty',
	description: 'Sends a truth/dare question.',
	execute: async (client, message, args, db) => {

		truth(message, args[0])
		
	}
}