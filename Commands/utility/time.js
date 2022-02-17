module.exports = {
  name: 'time',
  aliases: [],
  description: 'Shows the current time.',
  execute: async (client, message, args, db) => {

    message.reply({
      content: `<t:${Math.floor(Date.now()/1000) + 3600}:F>`,
      allowedMentions: { repliedUser: false }
    })

  }
}