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
		
		repeat(queue)

		let mode;
		if (await queue.repeatMode == 0) mode = 'Disabled'
		if (await queue.repeatMode == 1) mode = 'Song'
		if (await queue.repeatMode == 2) mode = 'Queue'

		message.channel.send({
			embeds: [{
				color: 0xD4C2DD,
				title: "Changed Repeat Mode",
				description: `**Repeat Mode:** ${mode}`
			}],
			reply: { messageReference: message.id },
			allowedMentions: { repliedUser: false }
		})
		
	}
}