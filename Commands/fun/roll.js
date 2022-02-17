module.exports = {
  name: 'roll',
  aliases: [],
  description: 'Chooses a random number from 1-100 if no arguments are provided. Otherwise, chooses a random number from 1 to the value provided.',
  execute: async (client, message, args, db) => {

    function random(value) {
      value = !isNaN(parseInt(args[0])) ? parseInt(args[0]) : 100;
      return Math.abs(Math.floor(Math.random() * value) + 1)
    }

    let choice = await random()

    message.reply({
      content: `You rolled ${choice}!`,
      allowedMentions: { repliedUser: false }
    })

  }
}