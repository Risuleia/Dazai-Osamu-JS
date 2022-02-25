const { bold, quote } = require("@discordjs/builders")

module.exports = {
	name: 'roleedit',
	aliases: ['re'],
	usage: '<name/color/mentionable/hoisted> <role-mention/role-id/role-name> <name/hex/true-false/true-false>',
	description: "Edits a specified property of a role.",
	userPermissions: ['MANAGE_ROLES'],
	botPermissions: ['MANAGE_ROLES'],
	execute: async (client, message, args, db) => {

		if (!args.length) return message.reply("You need to specify something.")
		
		// args
		let arg = args.join(` `)

		// parameter
		let allowedParams = ['name', 'color', 'colour', 'col', 'mention', 'mentionable', 'hoist', 'hoisted']
		let param = args[0].toLowerCase()
		if (!allowedParams.some(parameter => parameter == param)) return message.reply("Not a valid parameter. See the help for this command.")

		// regex
		let quotes = /("|')(.+?)("|')/gi
		let rep = /"|'/g
		let hex = /#?[a-f0-9]{6}/gi
		let match = arg.match(quotes) ? arg.match(quotes)[0] : args[1]
		
		// role
		if (args.length < 1) return message.reply("You need to specify a role.")
		let role = await message.guild.roles.cache.sort((a,b) => a.position - b.position).find(r => r.name.toLowerCase().includes(match.replace(rep,'').toLowerCase())) || await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id == args[1])

		// setting
		let val = arg.replace(param,'').replace(match,'').replace(/^ +/g,'')
		if (!val) return message.reply("Specify what you want to change it to.")

		// defaults
		const defCol = "#F4A2AB"

		// sub commands
			// name
			if (param == allowedParams[0]) {
	
				if (val == role.name) return message.reply("That's literally the same name.")
	
				let old = role.name
				try {
					role.setName(val)
						.then(r => {
							message.channel.send({
								embeds: [{
									color: defCol,
									title: "Role Edited!",
									description: `${r.toString()}\n\n${bold('Name:')}\n${quote(`${old} → ${r.name}`)}`,
									footer: { text: `ID: ${r.id}` },
									timestamp: new Date()
								}],
								reply: { messageReference: message.id },
								allowedMentions: { repliedUser: false }
							})
						})
				} catch (err) {
					throw err
				}
				
			}

			// color
			if (param == allowedParams[1] || param == allowedParams[2] || param == allowedParams[3]) {

				if (!val.match(hex)) return message.reply("Not a valid hex code.")

				let color = (val.startsWith("#")) ? val.toUpperCase() : `#${val}`.toUpperCase()
	
				if (color == role.hexColor.toUpperCase()) return message.reply("That's literally the same color.")
	
				let old = role.hexColor.toUpperCase()
				try {
					role.setColor(val)
						.then(r => {
							message.channel.send({
								embeds: [{
									color: defCol,
									title: "Role Edited!",
									description: `${r.toString()}\n\n${bold('Color:')}\n${quote(`${old} → ${r.hexColor.toUpperCase()}`)}`,
									footer: { text: `ID: ${r.id}` },
									timestamp: new Date()
								}],
								reply: { messageReference: message.id },
								allowedMentions: { repliedUser: false }
							})
						})
				} catch (err) {
					throw err
				}
			
		}

			// mentionable
			if (param == allowedParams[4] || param == allowedParams[5]) {

				let allowed = ['true', 'false', 'yes', 'no', 'on', 'off']
				if (!allowed.some(param => val.toLowerCase() == param)) return message.reply("Allowed arguments are true/false, yes/no or on/off.")
	
				if (role.mentionable && val.toLowerCase() == 'true'
						|| role.mentionable && val.toLowerCase() == 'yes'
						|| role.mentionable && val.toLowerCase() == 'on')
					return message.reply("That role is already hoisted.")
				if (!role.mentionable && val.toLowerCase() == 'false' 
						|| !role.mentionable && val.toLowerCase() == 'no' 
						|| !role.mentionable && val.toLowerCase() == 'off') return message.reply("That role is not mentionable from the get-go. What are you even trying to change?")
	
				let old = role.mentionable ? 'True' : 'False';
				try {
					if (val.toLowerCase() == 'true'
						|| val.toLowerCase() == 'yes'
						|| val.toLowerCase() == 'on')
						role.setMentionable(true)
						.then(r => {
							message.channel.send({
								embeds: [{
									color: defCol,
									title: "Role Edited!",
									description: `${r.toString()}\n\n${bold('Mentionable:')}\n${quote(`${old} → ${r.mentionable ? 'True' : 'False'}`)}`,
									footer: { text: `ID: ${r.id}` },
									timestamp: new Date()
								}],
								reply: { messageReference: message.id },
								allowedMentions: { repliedUser: false }
							})
						})
					if (val.toLowerCase() == 'false'
						|| val.toLowerCase() == 'no'
						|| val.toLowerCase() == 'off')
						role.setMentionable(false)
						.then(r => {
							message.channel.send({
								embeds: [{
									color: defCol,
									title: "Role Edited!",
									description: `${r.toString()}\n\n${bold('Mentionable:')}\n${quote(`${old} → ${r.mentionable ? 'True' : 'False'}`)}`,
									footer: { text: `ID: ${r.id}` },
									timestamp: new Date()
								}],
								reply: { messageReference: message.id },
								allowedMentions: { repliedUser: false }
							})
						})
				} catch (err) {
					throw err
				}
			
		}

			// hoisted
			if (param == allowedParams[6] || param == allowedParams[7]) {

				let allowed = ['true', 'false', 'yes', 'no', 'on', 'off']
				if (!allowed.some(param => val.toLowerCase() == param)) return message.reply("Allowed arguments are true/false, yes/no or on/off.")
	
				if (role.hoist && val.toLowerCase() == 'true'
						|| role.hoist && val.toLowerCase() == 'yes'
						|| role.hoist && val.toLowerCase() == 'on')
					return message.reply("That role is already hoisted.")
				if (!role.hoist && val.toLowerCase() == 'false' 
						|| !role.hoist && val.toLowerCase() == 'no' 
						|| !role.hoist && val.toLowerCase() == 'off') return message.reply("That role is not hoisted from the get-go. What are you even trying to change?")
	
				let old = role.hoist ? 'True' : 'False';
				try {
					if (val.toLowerCase() == 'true'
						|| val.toLowerCase() == 'yes'
						|| val.toLowerCase() == 'on')
						role.setHoist(true)
						.then(r => {
							message.channel.send({
								embeds: [{
									color: defCol,
									title: "Role Edited!",
									description: `${r.toString()}\n\n${bold('Hoisted:')}\n${quote(`${old} → ${r.hoist ? 'True' : 'False'}`)}`,
									footer: { text: `ID: ${r.id}` },
									timestamp: new Date()
								}],
								reply: { messageReference: message.id },
								allowedMentions: { repliedUser: false }
							})
						})
					if (val.toLowerCase() == 'false'
						|| val.toLowerCase() == 'no'
						|| val.toLowerCase() == 'off')
						role.setHoist(false)
						.then(r => {
							message.channel.send({
								embeds: [{
									color: defCol,
									title: "Role Edited!",
									description: `${r.toString()}\n\n${bold('Hoisted:')}\n${quote(`${old} → ${r.hoist ? 'True' : 'False'}`)}`,
									footer: { text: `ID: ${r.id}` },
									timestamp: new Date()
								}],
								reply: { messageReference: message.id },
								allowedMentions: { repliedUser: false }
							})
						})
				} catch (err) {
					throw err
				}
			
		}
		
	}
}