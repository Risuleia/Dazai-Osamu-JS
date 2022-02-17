const { shuffle } = require('../../Utilities/music.js');

module.exports = {
	name: 'shuffle',
	aliases: [],
	description: "Shuffles the queue.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to do that.")
		
		shuffle(voiceChan, queue)
		
	}
}