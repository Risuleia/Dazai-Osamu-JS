const { bold } = require("@discordjs/builders")

module.exports = {
	name: 'invite',
	aliases: ['inv'],
	description: "Sends the bot invite link.",
	execute: async (client, message, args, db) => {

		let inv = "https://discord.com/api/oauth2/authorize?client_id=937307272433000509&permissions=1644972474359&scope=bot%20applications.commands"

		let content = `${bold("Here's my invite:")}\n${inv}\n\nDazai <3`
		
		message.reply({
			embeds: [{
				color: 0x9DBCEA,
				description: content,
				footer: {
					text: `Note: You need "Manage Server" permission in the server you want to add the bot to.`
				}
			}],
			allowedMentions: { repliedUser: false }
		})
		
	}
}