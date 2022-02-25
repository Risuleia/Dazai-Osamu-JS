const { cry } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'cry',
	aliases: ['sad'],
	description: "Sends a crying/sad gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} is sad ;(`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await cry() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}