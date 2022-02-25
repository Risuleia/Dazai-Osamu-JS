const player = require('url-song-utilities');

module.exports = {
	name: 'lyrics',
	aliases: ['ly'],
	description: "Gets the lyrics for the current song or a song your specify.",
	execute: async (client, message, args, db) => {

		if (!args.length) {

			const voiceChan = message.member.voice.channel;
			const queue = await client.distube.getQueue(voiceChan);
			if (!queue.songs.length || queue.songs.length == 0) return message.reply("You need to first play something to get its lyric.")

			let title = await queue.songs[0].name
			
			await player.getLyrics(title).then(lyrics => {

				if (!lyrics) return message.reply({
					embeds: [{
						color: 0xD4C2DD,
						description: "Lyrics not found!"
					}]
				})

				const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

				message.reply({
					embeds: [{
						color: 0xD4C2DD,
						title: title,
						description: trim(lyrics,4096),
						footer: {
							text: `Requested by ${message.member.displayName}`,
							icon_url: message.member.displayAvatarURL({ dynamic: true })
						}
					}],
					allowedMentions: { repliedUser: false }
				})
				
			})
			
		} else {

			let title = args.join(` `)
			
			await player.getLyrics(title).then(lyrics => {

				if (!lyrics) return message.reply({
					embeds: [{
						color: 0xD4C2DD,
						description: "Lyrics not found!"
					}]
				})

				const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

				message.reply({
					embeds: [{
						color: 0xD4C2DD,
						title: title,
						description: trim(lyrics,4096),
						footer: {
							text: `Requested by ${message.member.displayName}`,
							icon_url: message.member.displayAvatarURL({ dynamic: true })
						}
					}],
					allowedMentions: { repliedUser: false }
				})
				
			})
			
		}
		
	}
}