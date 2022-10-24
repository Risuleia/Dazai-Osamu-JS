module.exports = {
	name: 'avatar',
	aliases: ['av'],
	description: 'Displays the avatar for a specified user.',
	execute: async (client, message, args, db) => {

		const user = !args.length ? await message.member.user : await client.users.cache.find(u => u.id == args[0]) || await message.guild.members.fetch({ query: args.join(` `) }).then(users => users.first()).then(u => u.user) || await message.mentions.users.first()

		if (!user) return message.channel.send({
			embeds: [{
				color: 0xffcba4,
				description: "User not found :("
			}],
			reply: { messageReference: message.id }
		})

		const target = await user.fetch({ force: true })

		const avatar = target.avatar ? await user.displayAvatarURL({ size: 2048, dynamic: true }) : null

		const emb = {
			color: 0xffcba4,
			title: avatar ? `Avatar for ${target.username}#${target.discriminator}` : 'This user doesn\'t have an avatar!',
			image: { url: avatar }
		}

		try {
			message.channel.send({
				embeds: [emb],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} catch (err) {
			throw err
		}
		
	}
}