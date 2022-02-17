const { numbers } = require("../../Utilities/emotes.js");

module.exports = {
	name: 'poll',
	aliases: [],
	description: "Creates a quick poll with up to 9 choices.",
	usage: `<title> | <choice 1>; <choice 2>...`,
	execute: async (client, message, args, db) => {

		// number emotes
		let num = [numbers.one, numbers.two, numbers.three, numbers.four, numbers.five, numbers.six, numbers.seven, numbers.eight, numbers.nine];

		// regex
		const wspace1 = /^ +| +$/g;
		const wspace2 = / +/g;
		const idRe = /\d{18}/g;
									
		// whole arg
		const arg = args.join(` `);
		const parts = arg.split("|").map(t => t.replace(wspace1,''))
		
		// title
		const title = parts[0].replace(wspace2,' ')

		// choices
		const choices = parts[1]?.split(";")?.map(c => c.replace(wspace1,'').replace(wspace2,' '))

		// checks
		if (!title || !title.length || !choices || !choices.length) return message.reply("That's not the correct usage of the command!")
		if (choices.length < 2) return message.reply("You need to provide atleast 2 choices!")
		if (choices.length > 9) return message.reply("You can only provide up to 9 choices!")

		// choice mapping
		let choiceMap = num.slice(0,choices.length).map((n, index) => `꒰${n}꒱ ${choices[index]}`)

		// random color
		const randHex = () => {
			const values = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
			let rand = Math.floor(Math.random() * 16)
			return `#${values[rand]}${values[rand]}${values[rand]}${values[rand]}${values[rand]}${values[rand]}`
		}
		
		// embed setting
		let emb = {
			color: randHex().toString(),
			title: title,
			description: choiceMap.join('\n')
		}

		// reactions
		let reactions = num
			.slice(0,choices.length)
			.map(n => n.match(idRe)[0])

		// sending and adding the reactions
		message.channel.send({
			embeds: [emb]
		})
		.then(message => {
			reactions.forEach(reaction => message.react(reaction))
		})
		
	}
}