

// cats function (sends random cat pictures)
module.exports = {
  name: 'cats',
  aliases: ['cat'],
	description: 'Sends a random cute cat image.',
  execute: async (client, message, args, db) => {
    message.reply({
      files: [{
        attachment: 'https://cataas.com/c/cute',
        name: 'cat.jpg'
      }]
    })
  }
}