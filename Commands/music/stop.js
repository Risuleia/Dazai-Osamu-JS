const { stop } = require('../../Utilities/music.js');

module.exports = {
	name: 'stop',
	aliases: ['leave', 'disconnect', 'dc'],
	description: "Stops the playback.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to stop.")
		
		stop(voiceChan, queue)
		message.reply({
			embeds: [
				{
					color: 0xD4C2DD,
					description: "Stopped playback! Now, disconnecting."
				}
			],
			allowedMentions: { repliedUser: false }
		})
		
	}
}