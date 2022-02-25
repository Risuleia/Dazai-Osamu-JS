const { run } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'run',
	aliases: [],
	description: "Sends a running gif.",
	execute: async (client, message, args, db) => {
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} runs away...`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await run() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}