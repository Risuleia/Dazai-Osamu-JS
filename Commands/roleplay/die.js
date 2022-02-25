const { die } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'die',
	aliases: ['dead'],
	description: "Sends a dying gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} dies :(`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await die() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}