const fetch = require('node-fetch');

module.exports = {
  name: 'typequote',
  aliases: ['tq'],
  description: "Starts a game where the user has to type a quote fast.",
  execute: async (client, message, args, db) => {

    const randomQuote = await fetch('https://api.quotable.io/random').then(res => res.json());
    const quote = await randomQuote.content

    const attachment = `https://textoverimage.moesif.com/image?image_url=https%3A%2F%2Fmedia.discordapp.net%2Fattachments%2F861216964105601032%2F941267767418576946%2Foie_PuyqJ74JOxKG.png&overlay_color=00000000&text=${quote}&text_color=f4825eff&text_size=32&margin=70&y_align=middle&x_align=center`
    
    var time;
    var reply;
    await message.reply({
      content: 'Type this asap:',
      files: [
        {
          attachment: await attachment,
          name: 'quote.png'
        }
      ]
    }).then(message => {
      time = message.createdTimestamp
      reply = message
    })

    let filter = msg => {
      if (!msg.author.bot && msg.content === quote) return true
    } 

    let collector = message.channel.createMessageCollector({
      filter,
      max: 1,
      time: 120000
    })

    collector.on('collect', async m => {
      
      let timeTaken = Math.round((m.createdTimestamp - time) / 1000)
      let author = m.member

      // typing speed
      let timeTakenMin = timeTaken / 60;
      let chars = quote.length;
      const typingSpeed = Math.round((chars / 5) / timeTakenMin)

      m.reply({

        embeds: [
          {
            color: 0xebca6e,
            description: `${author} typed it in ${timeTaken}s (${typingSpeed} WPM)!`
          }
        ],
        allowedMentions: { repliedUser: false }
      })
      collector.stop()

    })

    collector.on('end', async collected => {
      
      if (collected.size == 0) reply.reply({
        embeds: [
          {
            color: 0xebca6e,
            description: 'No one typed it in time!'
          }
        ],
        allowedMentions: { repliedUser: false }
      })
      
    })

  }
}