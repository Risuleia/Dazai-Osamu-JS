const fetch = require('node-fetch');
const { bold } = require('@discordjs/builders')
const { stylize } = require('../../Utilities/fonts.js');

module.exports = {
	name: 'animequote',
	aliases: ['aq', 'quote'],
	description: 'Sends an anime quote.',
	execute: async (client, message, args, db) => {

		const quote = await fetch('https://animechan.vercel.app/api/random')
		.then(res => res.json())
		if (!quote) return

		const stylized = stylize(quote.quote,'variant_italic')

		message.channel.send({
			embeds: [{
				color: 0xe6d0ce,
				description: `${bold('❛❛')}  ${stylized}  ${bold('❜❜')}\n\n— ${stylize(quote.character,'variant_italic')}`,
				footer: {
					text: stylize(quote.anime,'variant_italic')
				}
			}],
			reply: { messageReference: message.id },
			allowedMentions: { repliedUser: false }
		})
		
	}
}