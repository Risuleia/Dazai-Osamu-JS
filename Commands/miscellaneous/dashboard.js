module.exports = {
	name: 'dashboard',
	aliases: [],
	description: 'Sends a link to the bot dashboard.',
	execute: async (client, message, args, db) => {
		const dashboard = "https://Dazai-Osamu-JS.risuleia.repl.co"

		message.channel.send({
			content: dashboard,
			reply: { messageReference: message.id },
			allowedMentions: {  repliedUser: false }
		})
	}
}