module.exports = {
	name: 'nick',
	aliases: ['setnick'],
	usage: '<member> <new_nick>',
	description: 'Changes the nickname of a specified user.',
	userPermissions: ['MANAGE_NICKNAMES'],
	botPermission: ['MANAGE_NICKNAMES'],
	execute: async (client, message, args, db) => {

		// regex
		let re = /('|")(.+)('|")/g

		// checks
		if (!args.length) return message.channel.send({
			content: "You need to specify a member follwed by their new nickname.",
			reply: { messageReference: message.id }
		})

		let matches = args.join(` `).match(re)

		if (!matches && args.length < 2) return message.channel.send({
			content: "You need to specify a member follwed by their new nickname.",
			reply: { messageReference: message.id }
		})
		
		let query;
		let nick;
		if (matches) {
			query = matches[0].replace(/^('|")|('|")$/g,'')
			nick = args.join(` `).replace(matches[0],'').replace(/^ */g,'')
		} else {
			query = args[0]
			nick = args.slice(1,args.length).join(` `)
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
		if (user.roles?.highest.position >= message.member.roles?.highest.position) return message.channel.send({
			content: "You do not have control over that user!",
			reply: { messageReference: message.id }
		})

		try {
			user.setNickname(nick)
				.then(m => message.channel.send({
					content: `Changed ${m.toString()}'s nick to ${m.nickname}`,
					reply: { messageReference: message.id },
					allowedMentions: { repliedUser: false, users: false }
				}))
		} catch (err) {
			message.channel.send({
					content: 'An error occured while trying to process your request',
					reply: { messageReference: message.id }
				})
			throw err
		}
		
	}
}