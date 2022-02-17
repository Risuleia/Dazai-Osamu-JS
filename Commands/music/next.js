const { next } = require('../../Utilities/music.js');

module.exports = {
	name: 'next',
	aliases: [],
	description: "Plays the next song.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to do that.")
		if (queue.songs.length == 1) return message.reply("There is nothing to skip to")
		next(voiceChan, queue)
		
	}
}