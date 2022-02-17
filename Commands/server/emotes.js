const { pagination } = require('reconlx');

module.exports = {
  name: 'emotes',
  aliases: ['emojis', 'emotelist'],
  description: 'Displays all emotes in the server.',
  userPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
  botPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
  execute: async (client, message, args, db) => {

    if (!message.guild.emojis.cache) return message.reply({
      embeds: [{
        color: "#fac2d7",
        author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
        title: 'No emotes in this server yet!',
        footer: { text: client.user.tag, iconURL: client.user.displayAvatarURL() }
      }],
      allowedMentions: { repliedUser: false }
    })

    let roleMap;
    if (args[0]?.toLowerCase() == 'static')
    roleMap = message.guild.emojis.cache
        .filter(e => !e.animated)
        .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
        .map(e => `${e.toString()} | ${e.name}`)
    else if (args[0]?.toLowerCase() == 'animated')
    roleMap = message.guild.emojis.cache
        .filter(e => e.animated)
        .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
        .map(e => `${e.toString()} | ${e.name}`)
    else
    roleMap = message.guild.emojis.cache
        .sort((a, b) => b.createdTimestamp - a.createdTimestamp)
        .map(e => `${e.toString()} | ${e.name}`)

    let title;
    if (args[0]?.toLowerCase() == 'static')
    title = 'Static Emotes'
    else if (args[0]?.toLowerCase() == 'animated')
    title = 'Animated Emotes'
    else
    title = 'Emotes'
            
    const chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

    let pages = chunks(roleMap, 10).map(chunk => chunk.join('\n\n'))

    let embeds = pages.map(page => ({
        color: "#fac2d7",
        author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
        title: `${title} in ${message.guild.name}`,
        description: page,
        footer: { text: client.user.tag, iconURL: client.user.displayAvatarURL() }
    }));

    pagination({
      author: message.author,
      embeds: embeds,
      message: message,
      channel: message.channel,
      time: 120000,
      fastSkip: true
    })

  }
}