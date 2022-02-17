const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: 'whisper',
  aliases: [],
  description: 'Whisper something to another member! ;)',
  execute: async (client, message, args, db) => {

    const target = message.mentions.members.first();

    if (!target) return message.reply("You need to mention someone to whisper to.");

    args.splice(0,1)
    let statement = args.join(` `);

    if (!statement) return message.reply("You need to specify what you want to say to that user.");

    const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('whisperView')
					.setLabel('View Message')
					.setStyle('PRIMARY'),
			);

    await message.channel.send({ content: `${target}, ${message.author.tag} whispered something to you!`, components: [row] })
    await message.delete()

    const filter = (interaction) => {
      if (interaction.user.id === target.id) return true;
    }

    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1
    })

    collector.on("end", async whisperInteraction => {
      const id = whisperInteraction.first().customId;

      if (id === 'whisperView') return whisperInteraction.first().reply({
        content: `${target}, ${message.author.tag} says:\n${statement}`,
        ephemeral: true
      })

    })

  }
}