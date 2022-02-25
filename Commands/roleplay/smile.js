const { smile } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'smile',
	aliases: ['happy'],
	description: "Sends a smiling/happy gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} smiles :)`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await smile() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}