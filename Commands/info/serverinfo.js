const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  aliases: ['si','sinfo'],
  description: 'Shows the server information.',
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

    // count
    const mCount = server.memberCount
    const hCount = humans.size
    const bCount = bots.size
    const rCount = roles.size
    const cCount = server.channels.channelCountWithoutThreads
    const tCount = text.size
    const vCount = voice.size
    const eCount = emotes.size
    const sCount = stickers.size
    const pCount = server.premiumSubscriptionCount
    const pTier = server.premiumTier

    // created time
    const format = 'DD[/]MM[/]Y'
    const createdAt = moment(server.createdTimestamp).format(format)

    // owner
    const owner = await server.fetchOwner()

    // embed
    const infoEmbed = {
      color: 0xFAC2D7,
      author: {
        name: server.toString(),
        icon_url: server.iconURL({ dynamic: true })
      },
      thumbnail: {
        url: server.iconURL({ dynamic: true })
      },
      image: {
        url: server.bannerURL({ dynamic: true, size: 1024 }) || null
      },
      fields: [
        {
          name: 'Owner',
          value: owner.toString(),
          inline: true
        },
        {
          name: 'Boosts',
          value: `Level ${pTier.replace('TIER_', '')}\n${pCount} boosts`,
          inline: true
        },
        {
          name: 'Emotes/Stickers',
          value: `Emotes: ${eCount}\nStickers: ${sCount}`,
          inline: true
        },
        {
          name: 'Channels',
          value: `Total: ${cCount}\nText: ${tCount}\nVoice: ${vCount}`,
          inline: true
        },
        {
          name: 'Members',
          value: `Total: ${mCount}\nHumans: ${hCount}\nBots: ${bCount}`,
          inline: true
        },
        {
          name: 'Roles',
          value: rCount.toString(),
          inline: true
        }
      ],
      footer: {
        text: `ID: ${server.id} | ${createdAt}`
      }
    }

    message.reply({
      embeds: [infoEmbed],
      allowedMentions: { repliedUser: false }
    })

  }
}