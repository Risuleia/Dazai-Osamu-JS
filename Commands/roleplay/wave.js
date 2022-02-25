const { wave } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'wave',
	aliases: ['greet'],
	usage: '[member]',
	description: "Sends a waving gif.",
	execute: async (client, message, args, db) => {

		let user = !args[0] ? false : await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0])

		let target;
		if (user == false) target = ''
		else if (args[0] && user != false && (user == null || user == undefined)) target = ` to ${args[0]}`
		else if (args[0] && user != false) target = ` to ${user.displayName}`
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} waves${target}`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await wave() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}