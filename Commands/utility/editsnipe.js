const moment = require('moment');

module.exports = {
  name: 'editsnipe',
  aliases: ['esnipe'],
  description: 'Shows the edited message(s) in a channel.', 
  execute: async (client, message, args, db) => {

    return message.reply({
      embeds: [
        {
          color: 0xb9d3ee,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          },
          fields: [
            {
              name: 'Apologies!',
              value: "The command doesn't yet work for unknown reasons. I am looking into the issue. I will be back with it soon!"
            }
          ],
          footer: {
            text: 'Dazai <3'
          }
        }
      ]
    })

    const esnipes = client.edit_snipes.get(message.channel.id);
    console.log(esnipes)

    if (!esnipes) return message.reply('There are no edited messages in this channel!');

    const esnipe = +args[0] - 1 || 0;
    
    const target = esnipes[esnipe]
    if (!target) return message.reply(`There are only ${esnipes.length} deleted messages in this channel.`)

    const { msg, time, image } = target

    const snipeEmbed = {
      color: 0xb9d3ee,
      author: {
        name: msg.author.tag,
        icon_url: msg.author.displayAvatarURL()
      },
      fields: [
        {
          name: 'Message edited' || '\u200b',
          value: msg.content || '\u200b'
        }
      ],
      image: image,
      footer: {
        text: `${moment(time).fromNow()}・${esnipe + 1}/${esnipes.length}`
      }
    }

    message.reply({ embeds: [snipeEmbed], allowedMentions: { repliedUser: false } })

  }
}