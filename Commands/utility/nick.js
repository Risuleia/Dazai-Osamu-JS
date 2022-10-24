module.exports = {
	name: 'nick',
	aliases: [],
	usage: 'set <member> <new_nick>/reset <member>',
	description: 'Changes or resets the nickname of a specified user.',
	userPermissions: ['MANAGE_NICKNAMES'],
	botPermission: ['MANAGE_NICKNAMES'],
	execute: async (client, message, args, db) => {

		// sub-commands
		let subcommands = ['set', 'reset']
		
		// regex
		let re = /('|")(.+)('|")/g

		// checks
		let param = args[0].toLowerCase()
		if (!subcommands.some(cmd => cmd == param)) return message.channel.send({
			content: "Not a valid parameter. You can either \`reset\` or \`set\`.",
			reply: { messageReference: message.id }
		})

		let matches = args.slice(1,args.length).join(` `).match(re)

		if (!matches && args.length < 2) return message.channel.send({
			content: "You need to specify a member follwed by their new nickname.",
			reply: { messageReference: message.id }
		})
		
		let query;
		let nick;
		if (matches) {
			query = matches[0].replace(/^('|")|('|")$/g,'')
			nick = (param == subcommands[0]) ? args.join(` `).replace(matches[0],'').replace(/^ */g,'') : null
		} else {
			query = args[1]
			nick = (param == subcommands[0]) ? args.slice(2,args.length).join(` `) : null
		}

		let user = await message.guild.members.fetch({ query: query, limit: 1 }).then(members => members.first()) || await message.guild.members.cache.find(u => u.id == query) || await message.mentions.members.first()

		if (!user) return message.channel.send({
			content: "No such user found.",
			reply: { messageReference: message.id }
		})

		if (!user.manageable) return message.channel.send({
			content: "I do not have control over that user!",
			reply: { messageReference: message.id }
		})
		if (user.roles?.highest.position >= message.member.roles?.highest.position && message.member != user) return message.channel.send({
			content: "You do not have control over that user!",
			reply: { messageReference: message.id }
		})

		try {

			if (param == subcommands[0]) {
				user.setNickname(nick)
					.then(m => message.channel.send({
						content: `Changed ${m.toString()}'s nick to ${m.nickname}`,
						reply: { messageReference: message.id },
						allowedMentions: { repliedUser: false, users: false }
					}))
			}
			if (param == subcommands[1]) {
				user.setNickname(nick)
					.then(m => message.channel.send({
						content: `Reset ${m.toString()}'s nick`,
						reply: { messageReference: message.id },
						allowedMentions: { repliedUser: false, users: false }
					}))
			}
														 
		} catch (err) {
			
			message.channel.send({
					content: 'An error occured while trying to process your request',
					reply: { messageReference: message.id }
				})
			throw err
			
		}
		
	}
}