const moment = require('moment');

module.exports = {
  name: 'snipe',
  aliases: [],
  description: 'Shows the deleted message(s) in a channel.', 
  execute: async (client, message, args, db) => {

		const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

    const snipes = client.snipes.get(message.channel.id)
    if (!snipes) return message.reply('There are no deleted messages in this channel!')

    const snipe = +args[0] - 1 || 0;
    
    const target = snipes[snipe]
    if (!target) return message.reply(`There are only ${snipes.length} deleted messages in this channel.`)

    const { msg, time, image } = target

    const snipeEmbed = {
      color: 0xb9d3ee,
      author: {
        name: msg.author.tag,
        icon_url: msg.author.displayAvatarURL()
      },
      fields: [
        {
          name: 'Message deleted' || '\u200b',
          value: trim(msg.content) || '\u200b'
        }
      ],
      image: { url: image },
      footer: {
        text: `${moment(time).fromNow()}  •  ${snipe + 1}/${snipes.length}`
      }
    }

    message.reply({ embeds: [snipeEmbed], allowedMentions: { repliedUser: false } })

  }
}