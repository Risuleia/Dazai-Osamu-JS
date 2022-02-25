const { purr } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'purr',
	aliases: [],
	description: "Sends a purring gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} purrs~ adorable`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await purr() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}