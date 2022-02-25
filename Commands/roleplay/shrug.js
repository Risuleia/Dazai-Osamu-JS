const { shrug } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'shrug',
	aliases: [],
	description: "Sends a shrugging gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} shrugs`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await shrug() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}