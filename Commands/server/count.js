module.exports = {
	name: 'count',
	aliases: [],
	usage: "[members/channels/roles]",
	description: "Shows the count of members/roles/channels in the server.",
	execute: async (client, message, args, db) => {

		const server = message.guild

    // some global variables
    const members = await server.members.cache
    const roles = await server.roles.cache
    const channels = await server.channels.cache
    const emotes = await server.emojis.cache
    const stickers = await server.stickers.cache

    // members
    const humans = members.filter(member => !member.user.bot)
    const bots = members.filter(member => member.user.bot)

    // channels
    const text = channels.filter(channel => channel.isText())
    const voice = channels.filter(channel => channel.isVoice())

		// emotees
		const animated = emotes.filter(emote => emote.animated)
		const static = emotes.filter(emote => !emote.animated)

    // count
    const mCount = server.memberCount
    const hCount = humans.size
    const bCount = bots.size
    const rCount = roles.size
    const cCount = server.channels.channelCountWithoutThreads
    const tCount = text.size
    const vCount = voice.size
    const eCount = emotes.size
		const anCount = animated.size
		const stCount = static.size
    const sCount = stickers.size

		if (!args.length) {
			message.channel.send({
				embeds: [{
		      color: 0xFAC2D7,
		      author: {
		        name: server.toString(),
		        icon_url: server.iconURL({ dynamic: true })
		      },
		      fields: [
						{
							name: 'Stickers',
							value: sCount.toString()
						},
		        {
		          name: 'Emotes',
		          value: `Total: ${eCount}\nStatic: ${stCount}\nAnimated: ${anCount}`
		        },
		        {
		          name: 'Roles',
		          value: rCount.toString()
		        },
		        {
		          name: 'Members',
		          value: `Total: ${mCount}\nHumans: ${hCount}\nBots: ${bCount}`
		        },
		        {
		          name: 'Channels',
		          value: `Total: ${cCount}\nText: ${tCount}\nVoice: ${vCount}`
		        }
		      ]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} else if (args[0].toLowerCase() == 'members' || args[0].toLowerCase() == 'member') {
			message.channel.send({
				embeds: [{
		      color: 0xFAC2D7,
		      author: {
		        name: server.toString(),
		        icon_url: server.iconURL({ dynamic: true })
		      },
		      fields: [
		        {
		          name: 'Members',
		          value: `Total: ${mCount}\nHumans: ${hCount}\nBots: ${bCount}`,
		          inline: true
		        }
		      ]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} else if (args[0].toLowerCase() == 'roles' || args[0].toLowerCase() == 'role') {
			message.channel.send({
				embeds: [{
		      color: 0xFAC2D7,
		      author: {
		        name: server.toString(),
		        icon_url: server.iconURL({ dynamic: true })
		      },
		      fields: [
		        {
		          name: 'Roles',
		          value: rCount.toString(),
		          inline: true
		        }
		      ]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} else if (args[0].toLowerCase() == 'channels' || args[0].toLowerCase() == 'channel') {
			message.channel.send({
				embeds: [{
		      color: 0xFAC2D7,
		      author: {
		        name: server.toString(),
		        icon_url: server.iconURL({ dynamic: true })
		      },
		      fields: [
		        {
		          name: 'Channels',
		          value: `Total: ${cCount}\nText: ${tCount}\nVoice: ${vCount}`,
		          inline: true
		        }
		      ]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} else if (args[0].toLowerCase() == 'emotes' || args[0].toLowerCase() == 'emojis' || args[0].toLowerCase() == 'emote' || args[0].toLowerCase() == 'emoji') {
			message.channel.send({
				embeds: [{
		      color: 0xFAC2D7,
		      author: {
		        name: server.toString(),
		        icon_url: server.iconURL({ dynamic: true })
		      },
		      fields: [
		        {
		          name: 'Emotes',
		          value: `Total: ${eCount}\nStatic: ${stCount}\nAnimated: ${anCount}`,
		          inline: true
		        }
		      ]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} else if (args[0].toLowerCase() == 'stickers' || args[0].toLowerCase() == 'sticker') {
			message.channel.send({
				embeds: [{
		      color: 0xFAC2D7,
		      author: {
		        name: server.toString(),
		        icon_url: server.iconURL({ dynamic: true })
		      },
		      fields: [
						{
							name: 'Stickers',
							value: sCount.toString()
						}
		      ]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} else {
			message.channel.send({
				embeds: [{
		      color: 0xFAC2D7,
		      author: {
		        name: server.toString(),
		        icon_url: server.iconURL({ dynamic: true })
		      },
		      fields: [
						{
							name: 'Stickers',
							value: sCount.toString()
						},
		        {
		          name: 'Emotes',
		          value: `Total: ${eCount}\nStatic: ${stCount}\nAnimated: ${anCount}`
		        },
		        {
		          name: 'Roles',
		          value: rCount.toString()
		        },
		        {
		          name: 'Members',
		          value: `Total: ${mCount}\nHumans: ${hCount}\nBots: ${bCount}`
		        },
		        {
		          name: 'Channels',
		          value: `Total: ${cCount}\nText: ${tCount}\nVoice: ${vCount}`
		        }
		      ]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		}
		
	}
}