module.exports = {
  name: 'say',
  aliases: ['echo'],
  description: 'Makes the bot say something specified, in the channel the command is used in.',
  execute: async (client, message, args, db) => {

    if (args.length === 0) return message.reply("You didn't specify anything to say.");

    const statement = await args.join(` `);

    try {

      if (!message.reference) {

        message.channel.send(statement)
        message.delete()

      } else {
        message.channel.send({
          content: statement,
          reply: { messageReference: message.reference.messageId },
          allowedMentions: { repliedUser: false }
        })
        message.delete()
      }

    } catch {
      err => console.log(err)
    }

  }
}