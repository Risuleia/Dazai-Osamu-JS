const urban = require('urban');

module.exports = {
  name: 'urban',
  aliases: ['urbandictionary', 'define'],
  description: 'Defines the specified query based on definitions from Urban Dictionary.',
  execute: async (client, message, args, db) => {
    const query = args.join(` `);
    if(!query) return message.reply('Please enter a search query');

    const results = await urban(query);

    try {
      results.first(function(json) {
        if (!json) return message.reply({
          embeds: [{
            color: 0xefcaff,
            author: {
              name: 'Urban Dictionary',
              iconURL: 'https://static.npmjs.com/f1786e9b7cba9753ca7b9c40e8b98f67.png'
            },
            title: query,
            description: 'The definition for that was not found.',
            footer: {
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL()
            },
            timestamp: new Date()
          }],
          allowedMentions: { repliedUser: false }
        });

        message.reply({
          embeds: [{
            color: 0xefcaff,
            author: {
              name: 'Urban Dictionary',
              iconURL: 'https://static.npmjs.com/f1786e9b7cba9753ca7b9c40e8b98f67.png',
              url: json.permalink
            },
            title: json.word,
            description: json.definition,
            footer: {
              text: `Requested by ${message.author.tag}`,
              iconURL: message.author.displayAvatarURL()
            },
            timestamp: new Date()
          }],
          allowedMentions: { repliedUser: false }
        })
      });
    } catch {
      err => console.log(err)
    }
  }
}