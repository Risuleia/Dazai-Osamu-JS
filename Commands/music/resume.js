const { resume } = require('../../Utilities/music.js');

module.exports = {
	name: 'resume',
	aliases: [],
	description: "Resumes the playback.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		const queue = await client.distube.getQueue(voiceChan)

		if (!queue) return message.reply("You need to first play something to resume.")
		
		resume(voiceChan, queue)
		message.reply({
			embeds: [{
				color: 0xD4C2DD,
				description: "Playback resumed"
			}],
      allowedMentions: { repliedUser: false }		})
		
	}
}