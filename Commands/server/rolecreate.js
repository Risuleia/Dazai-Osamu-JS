const { bold } = require("@discordjs/builders")

module.exports = {
	name: 'rolecreate',
	aliases: ['rc'],
	usage: "<name> [color]",
	description: "Creates a role with specified parameters.",
	userPermissions: ['MANAGE_ROLES'],
	botPermissions: ['MANAGE_ROLES'],
	execute: async (client, message, args, db) => {

		if (!args.length) return message.reply("You have to specify atleast something.")

		// return console.log(args.join(` `).match(/(("|')?(.+?)("|')?) ?(#?[0-9a-fA-F]{6})? ?(\b(true|false|mentionable)\b)? ?(\b(true|false|hoisted)\b)?/gi))
		
		let quotesReg = /("|')(.+)("|')/g
		let hexReg = / #?[0-9a-fA-F]{6}/g

		// whole arg
		let arg = args.join(` `)

		// matches
		let quoteMatches = arg.match(quotesReg)
		let hexMatches = arg.match(hexReg)

		// some variables
		let name;
		let color;

		if (!quoteMatches) {
			name = args[0]
			color = hexMatches ? hexMatches[0].replace(' ','') : '#000000'
		} else if (quoteMatches) {
			name = quoteMatches[0].replace(/("|')/g,'')
			color = hexMatches ? hexMatches[0].replace(' ','') : '#000000'
		} else return message.reply("That is not the correct usage of the command.")

		message.guild.roles.create({
			name: name,
			color: (color.includes("#")) ? color : `#${color}`
		})
			.then(role => {
				message.reply({
					embeds: [{
						color: role.hexColor.toString(),
						title: "Role Created!",
						description: `${role.toString()}\n\n${bold('Name:')} ${role.name}\n${bold('Color:')} ${role.hexColor.toUpperCase()}`,
						footer: { text: `ID: ${role.id}` },
						timestamp: new Date()
					}],
					allowedMentions: { repliedUser: false }
				})
			})
			.catch(err => {
				message.channel.send("An error occurred while processing your request!")
				throw err
			})
		
	}
}