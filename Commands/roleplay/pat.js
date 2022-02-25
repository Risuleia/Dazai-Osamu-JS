const { pat } = require('../../Utilities/roleplay.js')

module.exports = {
	name: 'pat',
	aliases: [],
	usage: '<member>',
	description: "Sends a patting gif.",
	execute: async (client, message, args, db) => {

		let user = !args[0] ? false : await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0])

		let target;
		if (user == false) return message.reply("You need to specify someone to pat.")
		else if (args[0] && user != false && (user == null || user == undefined)) target = ` ${args[0]}`
		else if (args[0] && user != false) target = ` ${user.displayName}`
		
		const embed = {
			color: 0xB2A7FF,
			author: {
				name: `${message.member.displayName} pats${target}~ cute`,
				icon_url: message.member.displayAvatarURL({ dynamic: true }) 
			},
			image: { url: await pat() }
		}
		
		message.channel.send({
			embeds: [embed]
		})
		
	}
}