// Dependencies
const { Client, Collection } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const fs = require('fs');

// Creating the client
const client = new Client({
    intents: 32767,
});

// Creating the voice client
client.distube = new DisTube(client, {
	emitNewSongOnly: true,
	leaveOnFinish: true,
	emitAddSongWhenCreatingQueue: false,
	plugins: [new SpotifyPlugin()]
})

module.exports = client;

// Web server
const alive = require('./server');


// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
client.config = require("./config.json");
client.snipes = new Collection();
client.react_snipes = new Collection();
client.edit_snipes = new Collection();
client.afk = new Collection();
client.queues = new Map()

// Initializing the project
require("./Handlers")(client);

// Starting up the web server
alive()

// Logging in
const mySecret = process.env['TOKEN'];
client.login(mySecret);

// message events
// client.on("messageCreate", async message => {
//   if (message.author.bot) return;
//   if (!message.content.startsWith(PREFIX)) return;
//   if (!message.guild) return;
//   if (!message.member) message.member = await message.guild.fetchMember(message);
//   const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
//   const cmd = args.shift().toLowerCase();
//   if (cmd.length == 0) return;
//   let command = client.commands.get(cmd)
//   if (!command) command = client.commands.get(client.aliases.get(cmd));
//   if (command) command.execute(client, message, args, db)
// })