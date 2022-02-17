const client = require('../index');

client.distube
.on("addSong", (queue, song) => {
	queue.textChannel.send({
		embeds: [{
			color: 0xD4C2DD,
			description: `Added \`${song.name}\` - \`${song.formattedDuration}\` to the queue.\nRequested by: ${song.user}.`
		}]
	})
})
.on("addList", (queue, playlist) => {
	queue.textChannel.send({
		embeds: [{
			color: 0xD4C2DD,
			description: `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!\nRequested by: ${playlist.user}`
		}]
	})
})
.on("playSong", (queue, song) => {
	queue.textChannel.send({
		embeds: [{
			color: 0xD4C2DD,
			title: "Now Playing:",
			description: `\`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
		}]
	})
})
.on("finish", queue => {
	queue.textChannel.send({
		embeds: [{
			color: 0xD4C2DD,
			description: `Finished playback. Now, disconnecting.`
		}]
	})
})
.on("error", (channel, error) => {
	channel.send({
		embeds: [{
			color: 0xD4C2DD,
			description: 'An error occurred while doing that.'
		}]
	})
});