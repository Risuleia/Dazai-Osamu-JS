module.exports = {
  name: 'purge',
  aliases: [],
  description: "Mass-deletes a specified number of messages.",
  userPermissions: ['MANAGE_MESSAGES'],
  botPermissions: ['MANAGE_MESSAGES'],
  execute: async (client, message, args, db) => {

    const num = parseInt(args[0])

    if (isNaN(num)) return message.reply('Please specify a valid number of messages to purge.')

    message.channel.bulkDelete(num + 1, true)
      .then(messages => message.channel.send(`Purged ${messages.size - 1} messages!`))
      .then(message => setTimeout( () => {
        message.delete()
      }, 5000))

  }
}