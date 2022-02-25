const { pagination } = require('reconlx');

module.exports = {
  name: 'roles',
  aliases: ['rolelist', 'roleids'],
  description: 'Displays all roles in the server along with their IDs.',
  userPermissions: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],
  execute: async (client, message, args, db) => {

    let roleMap = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => `${r}\n> ꒰${r.id}꒱`);
            
    const chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

    let pages = chunks(roleMap, 10).map(chunk => chunk.join('\n\n'))

    let embeds = pages.map(page => ({
        color: "#fac2d7",
        author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
        title: `Roles in ${message.guild.name}`,
        description: page,
        footer: { text: client.user.tag, iconURL: client.user.displayAvatarURL() }
    }));

    pagination({
      author: message.author,
      embeds: embeds,
      message: message,
      channel: message.channel,
      time: 60000,
      fastSkip: true
    })

  }
}