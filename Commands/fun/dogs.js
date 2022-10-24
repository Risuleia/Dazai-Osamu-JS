const fetch = require('node-fetch')

// dogs function (send random dog pictures)
module.exports = {
  name: 'dogs',
  aliases: ['dog'],
	description: 'Sends a random cute dog image.',
  execute: async (client, message, args) => {

    function getDog() {
      return fetch("https://dog.ceo/api/breeds/image/random").then(res => {return res.json()}).then(data => {return data["message"]})
    }

    getDog().then(pic => 
      message.reply({
        files: [{
          attachment: pic,
          name: 'dog.jpg'
        }]
    }))
  }
}