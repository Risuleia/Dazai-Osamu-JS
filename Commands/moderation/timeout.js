const ms = require('ms');

module.exports = {
  name: 'timeout',
  aliases: ['tm'],
  description: 'Timeouts a specified user.',
  userPermissions: ['MODERATE_MEMBERS'],
  botPermissions: ['MODERATE_MEMBERS'],
  execute: async (client, message, args, db) => {
    
    if (args.length == 0) return message.reply("Specify a user to timeout them.")

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!target) return message.reply("That user doesn't exist.")

    if (!target.manageable || !target.moderatable || target.user.bot) return message.reply('I do not have control over that user.')

    if (target.roles.highest.position >= message.member.roles.highest.position) return message.reply('You cannot timeout this user!')

    if (target.isCommunicationDisabled()) return message.reply('That user is already timed out.')

    let length = args.slice(1,args.length).join(` `);
    if (!length) return message.reply('Please specify a valid period of time to timeout the user for.')

    let timeoutLength = ms(length)

    try {
      target.timeout(timeoutLength)
        .then(user => message.reply(`Timed out ${user.user.tag} for ${length}!`))
    } catch {
      e => message.reply("Some error occured while trying to process your request.") 
    }

  }
}