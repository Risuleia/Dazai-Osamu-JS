module.exports = {
  name: 'avatar',
  aliases: ['av'],
  description: 'Displays the avatar of a specified user.',
  execute: async (client, message, args, db) => {
    
    if (args.length === 0) return message.reply({
      embeds: [{
        color: 0xffcba4,
        title: `Avatar for ${message.author.tag}`,
        image: { url: message.author.avatar ? await message.author.displayAvatarURL({ size: 2048, dynamic: true }) : null },
      }],
      allowedMentions: { repliedUser: false }
    })

    let target = await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first())
              || await message.mentions.members.first()
              || await message.guild.members.cache.find(u => u.id == args[0])
              || await message.member;

    let avatar = target?.user.avatar ? await target.displayAvatarURL({ size: 2048, dynamic: true }) : null;

    const avatarEmbed = {
      color: 0xffcba4,
      title: target ? `Avatar for ${client.users.cache.find(u => u.id == args[0]) ? target.tag : target.user.tag}` : "User not found! :(",
      image: { url: avatar },
    }

    try {
      message.reply({
        embeds: [avatarEmbed],
        allowedMentions: { repliedUser: false }
      })
    } catch { err => console.log(err) }

  }
}