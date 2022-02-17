const ms = require('ms');

module.exports = {
  name: 'untimeout',
  aliases: ['utm'],
  description: 'Timeouts a specified user.',
  userPermissions: ['MODERATE_MEMBERS'],
  botPermissions: ['MODERATE_MEMBERS'],
  execute: async (client, message, args, db) => {
    
    if (args.length == 0) return message.reply("Specify a user to timeout them.")

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!target) return message.reply("That user doesn't exist.")

    if (!target.manageable || !target.moderatable || target.user.bot) return message.reply('I do not have control over that user.')

    if (target.roles.highest.position >= message.member.roles.highest.position) return message.reply('You cannot timeout this user!')

    if (!target.isCommunicationDisabled()) return message.reply('That user is not timed out.')

    try {
      target.timeout(null)
        .then(user => message.reply(`Removed the timeout for ${user.user.tag}!`))
    } catch {
      e => message.reply("Some error occured while trying to process your request.") 
    }

  }
}