const { stylize } = require('../../Utilities/fonts.js');

module.exports = {
  name: 'bold',
  aliases: ['bolden'],
  description: "Generates bold text from provided text.",
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to specify something to bolden.")
		
		const statement = args.join(` `)
		
		const res = stylize(statement, 'variant_bold')
		
		message.reply({
			content: res,
			allowedMentions: { repliedUser: false }
		})
		
  }
}