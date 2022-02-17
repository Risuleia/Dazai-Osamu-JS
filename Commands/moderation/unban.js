module.exports = {
  name: 'unban',
  aliases: [],
  description: 'Unbans a specified user from the guild.',
  userPermissions: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],
  execute: async (client, message, args, db) => {
    
    if (args.length == 0) return message.reply("Specify an ID to unban the user.")

    let bans = await message.guild.bans?.fetch();
    let target = await bans.find(ban => ban.user.id == args[0]);
    
    if (!target) return message.reply("That user is not banned.")

    try {
      message.guild.bans.remove(target.user.id, args.length > 1 ? args.slice(1,args.length).join(` `) : `Unbanned by ${message.author.tag}`)
        .then(user => message.reply(`Unbanned ${user.tag} from ${message.guild.name}!`))
    } catch {
      e => message.reply("Some error occured while trying to process your request") 
    }

  }
}