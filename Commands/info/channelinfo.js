const moment = require('moment');

module.exports = {
  name: 'channelinfo',
  aliases: ['ci'],
  description: 'Shows the information about a channel.',
  execute: async (client, message, args, db) => {

    let channel = !args.length ? await message.channel : await message.guild.channels.cache.find(c => c.name.toLowerCase().includes(args.join(` `).toLowerCase())) || await message.mentions.channels.first() || await message.guild.channels.cache.find(c => c.id == args[0]);

    if (!channel) return message.reply('Channel not found.')

    if (channel.type != 'GUILD_TEXT' && channel.type != 'GUILD_NEWS' && channel.type != 'GUILD_VOICE' && channel.type != 'GUILD_STAGE_VOICE') return message.reply("The only allowed types of channels are Text, Voice or Stage.")

    let type;
    if (channel.type == 'GUILD_TEXT' || channel.type == 'GUILD_NEWS') type = 'Text'
    else if (channel.type == 'GUILD_VOICE') type = 'Voice'
    else if (channel.type == 'GUILD_STAGE_VOICE') type = 'Stage';

    let locked;
    if (!channel.permissionsFor(message.guild.roles.everyone).has('VIEW_CHANNEL')) locked = 'True'
    else locked = 'False';

    let nsfw;
    if (channel.nsfw) nsfw = 'True'
    else nsfw = 'False';

    let format = 'DD[/]MM[/]Y'
    const createdAt = moment(channel.createdTimestamp).format(format)

    const infoEmbed = {
      color: 0xFAC2D7,
      title: channel.name,
      description: `${channel.type == 'GUILD_TEXT' ? channel.toString() + '\n\n' : ''}**Created:** ${createdAt}\n**Type:** ${type}\n**Locked:** ${locked}${channel.type == 'GUILD_TEXT' ? '\n**NSFW:** ' + nsfw : ''}`,
      footer: { text: `ID: ${channel.id}` },
      timestamp: new Date()
    }

    message.reply({
      embeds: [infoEmbed],
      allowedMentions: { repliedUser: false }
    })

  }
}