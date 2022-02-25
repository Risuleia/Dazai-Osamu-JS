const { stomp } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'stomp',
	aliases: [],
	usage: '<member>',
	description: "Sends a stomping gif.",
	execute: async (client, message, args, db) => {

		let user = !args[0] ? false : await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0])

		let target;
		if (user == false) return message.reply("You need to specify someone to stomp on.")
		else if (args[0] && user != false && (user == null || user == undefined)) target = ` on ${args[0]}'s foot`
		else if (args[0] && user != false) target = ` on ${user.displayName}'s foot`
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} stomps${target}! ow`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await stomp() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}