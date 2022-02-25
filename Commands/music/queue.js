const { pagination } = require('reconlx');
const { showQueue } = require('../../Utilities/music.js');

module.exports = {
	name: 'queue',
	aliases: [],
	description: "Shows the song queue.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to get the queue.")

		const songs = Array.from(await showQueue(queue));
		const song = await queue.songs[0]

		const chunks = (array, chunk_size) => Array(Math.ceil(array.length / chunk_size)).fill().map((_, index) => index * chunk_size).map(begin => array.slice(begin, begin + chunk_size));

    let pages = chunks(songs, 5).map(chunk => chunk.join('\n\n'))
		
		let embeds = pages.map(page => ({
			color: 0xD4C2DD,
			author: {
				name: message.guild.name,
				icon_url: message.guild.iconURL({ dynamic: true })
			},
			fields: [
				{
					name: 'Duration:',
					value: queue.formattedDuration
				},
				{
					name: 'Currently Playing:',
					value: song.name
				},
				{
					name: 'Songs:',
					value: page
				}
			],
			footer: {
				text: `Requested by ${message.member.displayName}`,
				icon_url: message.member.displayAvatarURL({ dynamic: true })
			}
		}))

		pagination({
      author: message.author,
      embeds: embeds,
      message: message,
      channel: message.channel,
      time: 120000,
      fastSkip: true
    })
		
	}
}