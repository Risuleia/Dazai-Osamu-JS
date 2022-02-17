const { pagination } = require('reconlx');

module.exports = {
  name: 'channels',
  aliases: ['channellist', 'channelids'],
  description: 'Displays all channels in the server along with their IDs.',
  userPermissions: ['MANAGE_CHANNELS'],
  botPermissions: ['MANAGE_CHANNELS'],
  execute: async (client, message, args, db) => {

    let channelMap = message.guild.channels.cache
            .filter(c => c.isText())
            .sort((a, b) => b.position - a.position)
            .map(c => `${c}\n > ꒰${c.id}꒱`);
            
    const chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

    let pages = chunks(channelMap, 10).map(chunk => chunk.join('\n\n'))

    let embeds = pages.map(page => ({
        color: "#fac2d7",
        author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
        title: `Channels in ${message.guild.name}`,
        description: page,
        footer: { text: client.user.tag, iconURL: client.user.displayAvatarURL() }
    }));

    pagination({
      author: message.author,
      embeds: embeds,
      message: message,
      channel: message.channel,
      time: 20000,
      fastSkip: true
    })

  }
}