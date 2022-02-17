const { TicTacToe } = require('djs-games');

module.exports = {
  name: 'tictactoe',
  aliases: ['ttt'],
  description: 'Starts a game of Tic-Tac-Toe.',
  execute: async (client, message, args, db) => {
    
    const opponent = message.mentions.users.first();

    if (!opponent) return message.reply("Mention someone to play with.")

    const game = new TicTacToe({
      message: message,
      opponent: opponent,
      xEmoji: '❌',
      oEmoji: '⭕',
      xColor: 'PRIMARY',
      oColor: 'PRIMARY',
      embedDescription: 'Tic-Tac-Toe',
    })
    game.start()

  }
}