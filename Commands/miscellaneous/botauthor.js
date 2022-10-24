module.exports = {
  name: 'botauthor',
  aliases: ['botowner', 'author'],
  description: "Displays the creator of the bot and other credits.",
  execute: async (client, message, args, db) => {

		const mimi = await client.users.fetch("800686782114693180")
		const risu = await client.users.fetch("693623099710505041")
		
    message.reply({
			content: `Created with ♡ by ${risu.username}#${risu.discriminator}!\nDebugged with assistance from ${mimi.username}#${mimi.discriminator}!`,
			allowedMentions: { repliedUser: false }
		})
		
  }
}