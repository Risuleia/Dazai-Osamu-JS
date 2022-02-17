const { stylize } = require('../../Utilities/fonts.js');

module.exports = {
  name: 'monospace',
  aliases: ['mono', 'smallcaps', 'smallcap'],
  description: "Generates monospaced text from provided text.",
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to specify something to generate monospaced text.")
		
		const statement = args.join(` `)
		
		const res = stylize(statement, 'variant_monospace')
		
		message.reply({
			content: res,
			allowedMentions: { repliedUser: false }
		})
		
  }
}