const { stylize } = require('../../Utilities/fonts.js');

module.exports = {
  name: 'italic',
  aliases: ['italics', 'italicize'],
  description: "Generates italic text from provided text.",
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to specify something to italicize.")
		
		const statement = args.join(` `)
		
		const res = stylize(statement, 'variant_italic')
		
		message.reply({
			content: res,
			allowedMentions: { repliedUser: false }
		})
		
  }
}