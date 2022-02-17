const { skip } = require('../../Utilities/music.js');

module.exports = {
	name: 'skip',
	aliases: [],
	description: "Skips to the next song or a specific song.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to do that.")
		if (queue.songs.length == 1) return message.reply("There is nothing to skip to")
		let pos = args[0]
		skip(voiceChan, queue, pos)
		
	}
}