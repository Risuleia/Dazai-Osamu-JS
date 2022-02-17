module.exports = {
  name: 'coinflip',
  aliases: ['cf', 'flip'],
  description: 'Flips a coin for you!',
  execute: async (client, message, args, db) => {

    const outcomes = ['Heads', 'Tails']

    let choice = outcomes[Math.floor(Math.random() * 2)]

    message.reply({
      content: `It's ${choice}!`,
      allowedMentions: { repliedUser: false }
    })

  }
}