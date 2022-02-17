const { Message, Client, MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'reactsnipe',
  aliases: ['rsnipe'],
  description: 'Shows the added reactions in a channel.', 
  execute: async (client, message, args, db) => {

    const react_snipes = client.react_snipes.get(message.channel.id)
    if (!react_snipes) return message.reply('No reactions have been added in this channel!')

    const react_snipe = +args[0] - 1 || 0;
    
    const target = react_snipes[react_snipe]
    if (!target) return message.reply(`There are only ${react_snipes.length} reactions in this channel.`)

    const { msg, time, reaction, user } = target

    const reactsnipeEmbed = {
      color: 0xb9d3ee,
      author: {
        name: `${user.username}#${user.discriminator}`,
        icon_url: user.displayAvatarURL({dynamic: true}),
        url: `https://discord.com/channels/${msg.guildId}/${msg.channelId}/${msg.id}`
      },
      fields: [
        {
          name: 'Reaction added',
          value: `${reaction}`
        }
      ],
      footer: {
        text: `${moment(time).fromNow()}  •  ${react_snipe + 1}/${react_snipes.length}`
      }
    }

    message.reply({ embeds: [reactsnipeEmbed], allowedMentions: { repliedUser: false } })

  }
}