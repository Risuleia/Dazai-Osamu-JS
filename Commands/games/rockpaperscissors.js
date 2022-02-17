const { RockPaperScissors } = require('djs-games');

module.exports = {
  name: 'rockpaperscissors',
  aliases: ['rps'],
  description: 'Starts a game of Rock-Paper-Scissors.',
  execute: async (client, message, args, db) => {
    
    const game = new RockPaperScissors({
      message: message
    })
    game.start()

  }
}