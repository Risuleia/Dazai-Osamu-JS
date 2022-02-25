const { pout } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'pout',
	aliases: [],
	description: "Sends a pout gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} makes a pout~ cutee`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await pout() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}