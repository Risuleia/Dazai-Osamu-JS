const moment = require('moment');

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  description: 'Shows the information about a member.',
  execute: async (client, message, args, db) => {

    let user = !args[0] ? await message.member : await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!user) return message.reply('Member not found.')

    let format = 'ddd[,] MMM DD[,] Y hh[:]mm A'
    const joinedAt = moment(user.joinedTimestamp).format(format)
    const createdAt = moment(user.user.createdTimestamp).format(format)

    let roleMap = user.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r);

    const roles = `${roleMap.slice(0,5).join(' ')} and ${roleMap.length - 5} more roles`

    var acknowledgement;
    if (user.id == message.guild.ownerId) acknowledgement = 'Server Owner'
    else if (user.permissions.has('ADMINISTRATOR')) acknowledgement = 'Server Admin'
    else if (user.permissions.any(['MANAGE_GUILD', 'MANAGE_CHANNELS', 'MANAGE_ROLES'], false)) acknowledgement = 'Server Moderator'
    else if (user.premiumSince) acknowledgement = 'Server Booster'
    else acknowledgement = 'No acknowledgements yet';

    const infoEmbed = {
      color: user.displayHexColor,
      author: {
        name: user.user.tag,
        icon_url: user.displayAvatarURL({ dynamic: true })
      },
      thumbnail: { url: user.user.displayAvatarURL({ dynamic: true }) },
      description: user.toString(),
      fields: [
        {
          name: 'Joined',
          value: joinedAt,
          inline: true
        },
        {
          name: 'Registered',
          value: createdAt,
          inline: true
        },
        {
          name: 'Acknowledgements',
          value: acknowledgement
        },
        {
          name: `Roles (${roleMap.length})`,
          value: !roleMap.length ? 'No roles' : roleMap.length <= 5 ? roleMap.join(` `) : roles
        }
      ],
      footer: { text: `ID: ${user.id}` },
      timestamp: new Date()
    }

    message.reply({
      embeds: [infoEmbed],
      allowedMentions: { repliedUser: false }
    })

  }
}