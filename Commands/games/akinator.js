const akinator = require("discord.js-akinator");

module.exports = {
  name: 'akinator',
  aliases: ['aki'],
  description: 'Starts an Akinator game!',
  execute: async (client, message, args, db) => {

    const allowedParameters = ['character', 'animal', 'object']

    var gameType;

    if (allowedParameters.some(parameter => args[0]?.toLowerCase() == parameter)) {
      gameType = args[0].toLowerCase()
    } else {
      gameType: 'character'
    }

    akinator(message, {
      language: 'en',
      childMode: false,
      gameType: gameType,
      useButtons: true,
      embedColor: '#bcd4e6'
    });

  }
}