const { blush } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'blush',
	aliases: ['shy'],
	description: "Sends a blushing gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} blushes`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await blush() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}