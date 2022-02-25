const { wyr } = require('../../Utilities/questions.js')

module.exports = {
	name: 'wouldyourather',
	aliases: ['wyr'],
	description: 'Asks a "Would you rather" question.',
	execute: async (client, message, args, db) => {

		wyr(message)
		
	}
}