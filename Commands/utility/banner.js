module.exports = {
	name: 'banner',
	aliases: [],
	description: 'Displays the banner for a specified user.',
	execute: async (client, message, args, db) => {

		const user = !args.length ? await message.author : await message.guild.members.fetch({ query: args.join(` `) }).then(users => users.first())?.then(u => u?.user) || await message.mentions.members.first()?.user || await client.users.cache.find(u => u?.id == args[0])

		if (!user) return message.channel.send({
			embeds: [{
				color: 0xffcba4,
				description: "User not found :("
			}],
			reply: { messageReference: message.id }
		})
		const target = await user.fetch({ force: true })

		const banner = target.banner ? await user.bannerURL({ size: 2048, dynamic: true }) : null

		const emb = {
			color: 0xffcba4,
			title: banner ? `Banner for ${target.username}#${target.discriminator}` : 'This user doesn\'t have an banner!',
			image: { url: banner }
		}

		try {
			message.channel.send({
				embeds: [emb],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} catch (err) {
			console.log(err)
			throw err
		}
		
	}
}