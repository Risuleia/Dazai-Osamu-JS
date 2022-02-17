module.exports = {
  name: 'react',
  aliases: [],
  description: 'Reacts to a replied message with the specified emotes.',
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply('You need to specify an emote to react with.')

    const arg = args.join(` `)
    const standardRegEx = /(<a?)?:\w+:(\d{18}>)?/g;
    const basicRegEx = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    const matches = arg.match(standardRegEx) || null
    const unicodeMatches = arg.match(basicRegEx) || null
    const emotes = matches?.map(match => match.split(/(\d{18})/g)[1]);

    if (!unicodeMatches && !matches) return message.reply('You need to specify valid emote(s).');

    if (!message.reference) return message.reply('You need to reply to a message to add reactions to.')

    const msgReactions = await message.channel.messages.fetch(message.reference.messageId, {force: true})
    const reactionNumber = JSON.parse(JSON.stringify(await msgReactions.reactions.cache)).length

    if (reactionNumber == 20) return message.reply('That message already has the maximum number of reactions!')

    const numberAllowed = 20 - reactionNumber
    if (unicodeMatches?.length >= numberAllowed || matches?.length >= numberAllowed || (unicodeMatches?.length + matches?.length) >= numberAllowed) return message.reply(`You can only add ${numberAllowed} reactions to that message.`)

    emotes?.forEach(emote => {
      let e = client.emojis.cache.find(e => e.id == emote)
      if (!e) return message.reply("I don't have access to that emote!")
      message.channel.messages.react(message.reference?.messageId, e)
    });
    
    unicodeMatches?.forEach(match => {
      message.channel.messages.react(message.reference?.messageId, !Array.isArray(match) ? match : match[0])
    });
    message.delete()

  }
}