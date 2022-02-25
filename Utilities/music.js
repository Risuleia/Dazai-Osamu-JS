const client = require('../index')
const { quote } = require('@discordjs/builders')

// helper function
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str)

// main functions
const play = async (voice_channel, text_channel, member, query) => {
	await client.distube.play(voice_channel, query, {
			textChannel: text_channel,
			member: member
		})
}

const resume = async (voice_channel, queue) => {
	await queue.resume(voice_channel)
}

const pause = async (voice_channel, queue) => {
	await queue.pause(voice_channel)
}

const next = async (voice_channel, queue) => {
	await queue.skip(voice_channel)
}

const previous = async (voice_channel, queue) => {
	await queue.previous(voice_channel)
}

const skip = async (voice_channel, queue, position) => {
	let index = parseInt(position)
	if (isNaN(index) || index < 0) return await queue.skip(voice_channel)
	else if (index > queue.songs.length) return await queue.jump(queue.songs.length)
	else return await queue.jump(index) 
}

const stop = async (voice_channel, queue) => {
	await queue.stop(voice_channel)
}

const repeat = async (queue) => {
	// if (!param || param?.toLowerCase() == 'off') return await queue.setRepeatMode(0)
	// else if (['one', '1', 'song'].some(p => p == param?.toLowerCase())) return await queue.setRepeatMode(1)
	// else if (['queue', 'list', '2', 'all'].some(p => p == param?.toLowerCase())) return await queue.setRepeatMode(2)
	// else return message.reply("Not a valid parameter.")
	await queue.setRepeatMode()
}

const shuffle = async (voice_channel, queue) => {
	await queue.shuffle(voice_channel)
}

const showQueue = async (queue) => {
	return queue.songs.map((song, id) => `${id + 1} **|** ${trim(song.name, 50)}\n${quote(song.formattedDuration)}`)
}

const volume = async (voice_channel, volume) => {
	await client.distube.setVolume(voice_channel, volume)
}

module.exports = {
	play: play,
	resume: resume,
	pause: pause,
	skip: skip,
	next: next,
	previous: previous,
	repeat: repeat,
	shuffle: shuffle,
	stop: stop,
	showQueue: showQueue,
	volume: volume
}