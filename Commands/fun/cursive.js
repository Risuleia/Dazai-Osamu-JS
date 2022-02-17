const { stylize } = require('../../Utilities/fonts.js');

module.exports = {
  name: 'cursive',
  aliases: ['style', 'stylize'],
  description: "Generates stylized cursive text from provided text.",
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to specify something to generate cursive text.")
		
		const statement = args.join(` `)
		
		const res = stylize(statement, 'variant_style')
		
		message.reply({
			content: res,
			allowedMentions: { repliedUser: false }
		})
		
  }
}