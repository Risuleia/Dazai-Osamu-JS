const { quote } = require("@discordjs/builders")

module.exports = {
	name: 'nowplaying',
	aliases: ['currentlyplaying', 'np'],
	description: "Shows the currently playing song.",
	execute: async (client, message, args, db) => {

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")
		
		const queue = await client.distube.getQueue(voiceChan)
		if (!queue) return message.reply("You need to first play something to do that.")

		const song = await queue.songs[0]
		if (!song) return message.reply("Nothing is playing.")

    const time = `\`${queue.formattedCurrentTime}\` - \`${queue.formattedDuration}\``
		
		message.reply({
			embeds: [
				{
					color: 0xD4C2DD,
					title: "Currently Playing:",
					description: `\`${song.name}\`\n${quote(time)}`
				}
			],
			allowedMentions: { repliedUser: false }
		})
		
	}
}