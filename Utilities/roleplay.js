const fetch = require("node-fetch")

// token
const token = '852830323787431936.Ti4L4MqvnahXWMq8ebfz';

// base url
let url = "https://kawaii.red/api/gif"

// wave
const wave = async () => {
	let base = `${url}/wave/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// cry
const cry = async () => {
	let base = `${url}/cry/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// happy
const happy = async () => {
	let base = [`${url}/happy/token=${token}`, `${url}/smile/token=${token}`]
	let choice = base[Math.floor(Math.random() * base.length)]
	let res = await fetch(choice).then(data => data.json())
	return res["response"]
}

// laugh
const laugh = async () => {
	let base = `${url}/laugh/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// purr
const purr = async () => {
	let base = `${url}/purr/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// pout
const pout = async () => {
	let base = `${url}/pout/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// mad
const mad = async () => {
	let base = `${url}/mad/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// shrug
const shrug = async () => {
	let base = `${url}/shrug/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// blush
const blush = async () => {
	let base = `${url}/blush/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// run
const run = async () => {
	let base = `${url}/run/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// highfive
const highfive = async () => {
	let base = `${url}/highfive/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}
	
// facepalm
const facepalm = async () => {
	let base = `${url}/facepalm/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// dance
const dance = async () => {
	let base = `${url}/dance/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// clap
const clap = async () => {
	let base = `${url}/clap/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// bite
const bite = async () => {
	let base = `${url}/bite/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// lick
const lick = async () => {
	let base = `${url}/lick/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// pat
const pat = async () => {
	let base = `${url}/pat/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// kiss
const kiss = async () => {
	let base = `${url}/kiss/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// hug
const hug = async () => {
	let base = `${url}/hug/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// cuddle
const cuddle = async () => {
	let base = `${url}/cuddle/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// poke
const poke = async () => {
	let base = `${url}/poke/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// punch
const punch = async () => {
	let base = `${url}/punch/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// slap
const slap = async () => {
	let base = `${url}/slap/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// stomp
const stomp = async () => {
	let base = `${url}/stomp/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// shoot
const shoot = async () => {
	let base = `${url}/shoot/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// kill
const kill = async () => {
	let base = `${url}/kill/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

// die
const die = async () => {
	let base = `${url}/die/token=${token}`
	let res = await fetch(base).then(data => data.json())
	return res["response"]
}

module.exports = {
	wave: wave,
	happy: happy,
	cry: cry,
	laugh: laugh,
	purr: purr,
	pout: pout,
	mad: mad,
	shrug: shrug,
	blush: blush,
	run: run,
	highfive: highfive,
	facepalm: facepalm,
	dance: dance,
	clap: clap,
	bite: bite,
	lick: lick,
	pat: pat,
	kiss: kiss,
	hug: hug,
	cuddle: cuddle,
	poke: poke,
	punch: punch,
	slap: slap,
	stomp: stomp,
	shoot: shoot,
	kill: kill,
	die: die
}