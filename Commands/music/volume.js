const { volume } = require('../../Utilities/music.js');

module.exports = {
	name: 'volume',
	aliases: [],
	description: "Changes the playback volume.",
	userPermissions: ['MANAGE_MESSAGES'],
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")
		
		const queue = await client.distube.getQueue(voiceChan)
		if (!queue) return message.reply("You need to play something first.")

		if (!args.length) {
			message.reply({
				embeds: [{
					color: 0xD4C2DD,
					description: `Current playback volume is ${queue.volume}%`
				}],
				allowedMentions: { repliedUser: false }
			})
		} else if (args[0] == 'set') {	
			const vol = parseInt(args[1])
			if (isNaN(vol) || vol < 1 || vol > 100) return message.reply("You need to provide a valid value between 1 and 100")
			
			volume(voiceChan, vol)
			message.reply({
				embeds: [{
					color: 0xD4C2DD,
					description: `Playback volume set to ${queue.volume}%`
				}],
				allowedMentions: { repliedUser: false }
			})
		}
		
	}
}