const { pagination } = require('reconlx');

module.exports = {
  name: 'bans',
  aliases: ['banlist'],
  description: 'Displays all the bans in the server.',
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],
  execute: async (client, message, args, db) => {

    let arr = await message.guild.bans.fetch()
    let banMap = arr
            .map(ban => `**${ban.user.tag}**\n > ${ban.user.id}`);
            
    if (!arr) return message.reply({
        embeds: [{
          color: "#fac2d7",
          author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
          title: 'No bans in this server',
          footer: { text: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        }],
        allowedMentions: { repliedUser: false }
      })
            
    const chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

    let pages = chunks(banMap, 10).map(chunk => chunk.join('\n\n'))

    let embeds = pages.map(page => ({
        color: "#fac2d7",
        author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
        title: `Bans in ${message.guild.name}`,
        description: banMap ? page : 'No bans in this server',
        footer: { text: client.user.tag, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
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