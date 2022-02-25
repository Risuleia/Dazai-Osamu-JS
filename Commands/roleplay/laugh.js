const { laugh } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'laugh',
	aliases: [],
	description: "Sends a laughing gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} laughs`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await laugh() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}