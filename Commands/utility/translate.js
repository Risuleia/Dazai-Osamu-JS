const { blockQuote } = require('@discordjs/builders');
const translate = require('@iamtraction/google-translate');
const ISO6391 = require('iso-639-1');

module.exports = {
  name: 'translate',
  aliases: ['ts'],
  description: "Translates specified text to English",
  execute: async (client, message, args, db) => {

    if (args.length === 0) return message.reply("You need to specify something to translate.")

    const text = args.join(` `);

    translate(text, {to: 'en'}).then(res => {
      const localeName = ISO6391.getName(res.from.language.iso);

    	const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
      
      message.reply({
        embeds: [{
          color: 0x98ff98,
          author: { name: message.author.tag, icon_url: message.author.displayAvatarURL({dynamic: true}) },
          title: trim(text,100),
          description: blockQuote(trim(res.text, 4096)),
          footer: { text: `Translated from ${localeName}` }
        }],
        allowedMentions: { repliedUser: false }
      })
    }).catch(err => {
        console.error(err);
    });

  }
}