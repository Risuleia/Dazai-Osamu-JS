const fetch = require('node-fetch')

module.exports = {
	name: 'color',
	aliases: ['colour', 'col'],
	usage: '[hex-code/member/role]',
	description: "Shows information about a specified color (hex) or generates a random color.",
	execute: async (client, message, args, db) => {

		// base url
		let base = 'https://www.thecolorapi.com/id?hex='
		let gen = 'https://singlecolorimage.com/get/'

		// random generator
		const random = async () => {
			let color = await fetch('http://www.colr.org/json/color/random').then(res => res.json()).then(data => data.colors[0].hex)
			return color
		}

		// regex
		let reg = /#?[a-f0-9]{6}/gi
		let matches = args?.join(` `)?.match(reg);

		// color
		let col;
		if (matches) col = matches[0]
		else col = await random()

		let res = await fetch(`${base}${col.replace("#",'')}`).then(res => res.json())

		try {
			message.channel.send({
				embeds: [{
					color: res.hex.value,
					title: res.name.value,
					thumbnail: { url: `${gen}${col.replace("#",'')}/800x800` },
					fields: [
						{
							name: 'Hex:',
							value: res.hex.value,
							inline: true
						},
						{
							name: 'RGB:',
							value: res.rgb.value.replace(/[a-z]+|\(|\)/gi,''),
							inline: true
						},
						{
							name: 'CMYK:',
							value: res.cmyk.value.replace(/[a-z]+|\(|\)/gi,''),
							inline: true
						},
						{
							name: 'HSV:',
							value: res.hsv.value.replace(/[a-z]+|\(|\)/gi,''),
							inline: true
						},
						{
							name: 'HSL:',
							value: res.hsl.value.replace(/[a-z]+|\(|\)/gi,''),
							inline: true
						},
						{
							name: 'XYZ:',
							value: res.XYZ.value.replace(/[a-z]+|\(|\)/gi,''),
							inline: true
						}
					]
				}],
				reply: { messageReference: message.id },
				allowedMentions: { repliedUser: false }
			})
		} catch (err) {
			message.channel.send({
				content: "An error occurred.",
				reply: { messageReference: message.id }
			})
			throw err
		}
		
	}
}