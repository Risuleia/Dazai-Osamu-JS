const fetch = require("node-fetch")

module.exports = {
	name: 'random',
	aliases: ['rand'],
	usage: "<topic/color/fact>",
	description: "Generates a random useless-fact!",
	execute: async (client, message, args, db) => {
		
		let data = fetch('https://uselessfacts.jsph.pl/random.json?language=en').then(res => res.json()).then(data => data.text)
	
		message.channel.send({
			content: await data,
			reply: { messageReference: message.id },
			allowedMentions: { repliedUser: false }
		})
		
	}	
}