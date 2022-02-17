const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { play } = require('../../Utilities/music.js');

module.exports = {
	name: 'play',
	aliases: ['p'],
	description: "Plays music like you'd expect it to.",
	botPermissions: ['CONNECT', 'SPEAK'],
	execute: async (client, message, args, db) => {

		if (!args.length) return message.reply("You need to specify something to play.")

		const voiceChan = message.member.voice.channel
		if (!voiceChan) return message.reply("You need to be in a voice channel to use this.")

		if (message.guild.me.voice.channelId && voiceChan.id !== message.guild.me.voice.channelId) return message.reply(`I am already playing music in <#${message.guild.me.voice.channelId}>`)

		let urlRegEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi

		let matches = args.join(` `).match(urlRegEx)
									
		let searchTerm;
		if (matches) searchTerm = matches[0]
		else searchTerm = args.join(` `)
		
		play(voiceChan, message.channel, message.member, searchTerm)
		
	}
}