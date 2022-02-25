const fetch = require('node-fetch');

module.exports = {
  name: 'typeword',
  aliases: ['tw'],
  description: "Starts a game where the user has to type a word fast.",
  execute: async (client, message, args, db) => {

    const randomWord = await fetch('https://random-word-api.herokuapp.com/word?number=1&swear=0').then(res => res.json());
    const word = await randomWord[0]

		if (!randomWord) return message.channel.send({
			content: "Oop! An error occurred!",
			reply: { messageReference: message.id },
			allowedMentions: { repliedUser: false }
		})
			
		const attachment = `https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F861216964105601032%2F941267767418576946%2Foie_PuyqJ74JOxKG.png&overlay_color=00000000&text=${word}&text_color=f4825eff&text_size=32&margin=70&y_align=middle&x_align=center`

    var time;
    var reply;
    await message.channel.send({
      content: 'Type this asap:',
      files: [
        {
          attachment: await attachment,
          name: 'word.png'
        }
      ],
			reply: { messageReference:  message.id }
    }).then(message => {
      time = message.createdTimestamp
      reply = message
    })

    let filter = msg => {
      if (!msg.author.bot && msg.content === word) return true
    } 

    let collector = message.channel.createMessageCollector({
      filter,
      max: 1,
      time: 30000
    })

    collector.on('collect', async m => {
      
      let timeTaken = Math.round((m.createdTimestamp - time) / 1000)
      let author = m.member

      m.channel.send({

        embeds: [
          {
            color: 0xebca6e,
            description: `${author} typed it in ${timeTaken}s!`
          }
        ],
				reply: { messageReference: m.id },
        allowedMentions: { repliedUser: false }
      })
      collector.stop()

    })

    collector.on('end', async collected => {
      
      if (collected.size == 0) message.channel.send({
        embeds: [
          {
            color: 0xebca6e,
            description: 'No one typed it in time!'
          }
        ],
				reply: { messageReference: reply.id },
        allowedMentions: { repliedUser: false }
      })
      
    })

  }
}