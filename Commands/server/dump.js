module.exports = {
  name: 'dump',
  aliases: ['roleusers'],
  description: "Shows all users with a specific role.",
  userPermissions: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],
  execute: async (client, message, args, db) => {

    if (!args.length) message.reply("You need to specify a role!")

    let role = await message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args.join(` `).toLowerCase())) || await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id == args[0])

    let members = message.guild.members.cache

    let roleMembers = members
            .filter(m => m.roles.cache.has(role.id))
            .sort((a,b) => b.roles.highest.position - a.roles.highest.position)
            .map(m => `${m.user.tag}\n> ꒰${m.id}꒱`)

    let desc;
    if (!roleMembers || !roleMembers.length) desc = 'No users with this role!'
    else if (roleMembers.length >= 15) desc = `${roleMembers.join('\n\n')}\n\n**...and ${roleMembers.length - 15} others**`
    else desc = roleMembers.join('\n\n')

    const dumpEmbed = {
      color: "#fac2d7",
      author: { name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) },
      title: `Members with the ${role.name} role`,
      description: desc,
      footer: { text: client.user.tag, iconURL: client.user.displayAvatarURL() }
    }

    message.reply({
      embeds: [dumpEmbed],
      allowedMentions: { repliedUser: false }
    })

  }
}