module.exports = {
  name: 'choose',
  aliases: [],
  description: 'Makes a choice from specified choices.',
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to provide atleast 2 choices separated by comma(s).")

    const joined = args.join(` `)

    const choices = joined.split(',')

    if (choices.length <= 1) return message.reply("You need to provide atleast 2 choices separated by comma(s).")

    let choice = choices[Math.floor(Math.random() * choices.length)]

    function removeWhitespace(value) {
      return value.replace(/ +/g, '')
    }

    message.reply({
      content: `I choose ${removeWhitespace(choice)}!`,
      allowedMentions: { repliedUser: false }
    })

  }
}