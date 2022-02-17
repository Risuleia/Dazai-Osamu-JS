const { repeat } = require('../../Utilities/music.js');

module.exports = {
	name: 'repeat',
	aliases: ['rep', 'loop'],
	description: "Disables or sets the looping to a song or the queue.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to do that.")
		
		repeat(queue, message, args[0])
		
	}
}