const { dance } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'dance',
	aliases: [],
	usage: '[member]',
	description: "Sends a dancing gif.",
	execute: async (client, message, args, db) => {

		let user = !args[0] ? false : await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0])

		let target;
		if (user == false) target = ''
		else if (args[0] && user != false && (user == null || user == undefined)) target = ` with ${args[0]}`
		else if (args[0] && user != false) target = ` with ${user.displayName}`
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} steps on those moves${target}`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await dance() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}