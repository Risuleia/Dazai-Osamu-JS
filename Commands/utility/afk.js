module.exports = {
  name: 'afk',
  aliases: [],
  description: "Sets your AFK status. Informs them when they ping you, and removes the status when you text back!",
  botPermissions: ['MANAGE_NICKNAMES'],
  execute: async (client, message, args, db) => {

    const reason = args.join(` `) || 'AFK';

    client.afk.set(`${message.guild.id}_${message.author.id}`, [Date.now(), reason])

    message.reply({
      content: `${message.member.nickname || message.author.username}, I've set your AFK: ${reason}`
    })

    if (message.member.manageable) {
      message.member.setNickname(`[AFK] ${message.member.displayName}`)
    }

  }
}