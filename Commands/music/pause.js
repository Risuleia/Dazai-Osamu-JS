const { pause } = require('../../Utilities/music.js');

module.exports = {
	name: 'pause',
	aliases: [],
	description: "Pauses the playback.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to pause.")
		
		pause(voiceChan, queue)
    message.reply({
			embeds: [{
				color: 0xD4C2DD,
				description: "Playback paused"
			}],
			allowedMentions: { repliedUser: false }
		})
	}
}