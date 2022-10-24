const fetch = require('node-fetch')
const hye_dat = require('./hye.json')

const td_base = 'https://raw.githubusercontent.com/sylhare/Truth-or-Dare/master/src/output.json'
let td_data = fetch(td_base).then(res => res.json())

const truth = async (message, lvl) => {
	let level;
	if (['normal', '1', 'easy'].some(p => lvl == p)) level = 1
	else if (['medium', '2', 'intermediate', 'mid'].some(p => lvl == p)) level = 2
	else if (['hard', '3', 'difficult', 'extreme'].some(p => lvl == p)) level = 3
	else level = 1
	
	let dat = await td_data
	let filtered = dat.filter(d => d.type == 'Truth' && d.level == level); 
	
	let question = await filtered[Math.floor(Math.random() * filtered.length)]
	
	message.channel.send({
		embeds: [{
			color: 'RANDOM',
			fields: [
				{
					name: `Truth | Level: ${question.level}`,
					value: question.summary
				}
			]
		}],
		reply: { messageReference: message.id },
		allowedMentions: { repliedUser: false }
	})
	
}

const dare = async (message, lvl) => {
	
	let level = 1
	if (['normal', '1', 'easy'].some(p => lvl == p)) level = 1
	if (['medium', '2', 'intermediate', 'mid'].some(p => lvl == p)) level = 2
	if (['hard', '3', 'difficult', 'extreme'].some(p => lvl == p)) level = 3
	
	let dat = await td_data
	let filtered = dat.filter(d => d.type == 'Dare' && d.level == level);
	
	let challenge = await filtered[Math.floor(Math.random() * filtered.length)]

	message.channel.send({
		embeds: [{
			color: 'RANDOM',
			fields: [
				{
					name: `Dare | Level: ${level}`,
					value: challenge.summary
				}
			]
		}],
		reply: { messageReference: message.id },
		allowedMentions: { repliedUser: false }
	})
	
}

const hye = async (message) => {

	let hye_data = await hye_dat
	let question = hye_data[Math.floor(Math.random() * hye_data.length)]

	message.channel.send({
		embeds: [{
			color: 'RANDOM',
			fields: [
				{
					name: 'Have you ever',
					value: question
				}
			]
		}],
		reply: { messageReference: message.id },
		allowedMentions: { repliedUser: false }
	})
	
}

module.exports = {
	truth: truth,
	dare: dare,
	hye: hye
}