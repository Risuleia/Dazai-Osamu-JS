module.exports = {
	name: 'bigmoji',
	aliases: ['bmoji'],
	description: "Displays the large size version of a specified emote.",
	execute: async (client, message, args, db) => {

		if (!args.length) return message.reply("You need to specify an emote.")

		const re = /(<a?)?:\w+:(\d{18}>)?/g;
		let matches = args[0].match(re) || null
			
		const emote = client.emojis.cache.find(e => e?.name.toLowerCase() == args[0].toLowerCase()) || matches?.map(match => match.split(/(\d{18})/g)[1])

		if (!emote) return message.reply("That doesn't seem to be an emote.")

		let ext;
		if (emote.animated) ext = '.gif'
		else ext = '.png'

		let base_url = 'https://cdn.discordapp.com/emojis/'

		let emote_url = `${base_url}${emote.id || emote[0]}${ext}?size=96&quality=lossless`

		message.reply({
			files: [
				{
					attachment: emote_url,
					name: `emote${ext}`
				}
			],
			allowedMentions: { repliedUser: false }
		})
		
	}
}