const moment = require('moment');

module.exports = {
  name: 'roleinfo',
  aliases: ['ri'],
  description: 'Shows the information about a role.',
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to specify a role to get its information.")

    let role = await message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.join(` `).toLowerCase())) || await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id == args[0]);

    if (!role) return message.reply('Role not found.')

    let format = 'DD[/]MM[/]Y'
    const createdAt = moment(role.createdTimestamp).format(format)

    const infoEmbed = {
      color: role.hexColor,
      title: role.name,
      thumbnail: { url: role.iconURL({ dynamic: true }) || null },
      description: `${role.toString()}\n\n**Color:** ${role.hexColor.toUpperCase()}\n**Created:** ${createdAt}\n**Hoisted:** ${role.hoist ? 'True' : 'False'}\n**Mentionable:** ${role.mentionable ? 'True' : 'False'}`,
      footer: { text: `ID: ${role.id}` },
      timestamp: new Date()
    }

    message.reply({
      embeds: [infoEmbed],
      allowedMentions: { repliedUser: false }
    })

  }
}