const { facepalm } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'facepalm',
	aliases: [],
	description: "Sends a facepalming gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} facepalms`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await facepalm() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}