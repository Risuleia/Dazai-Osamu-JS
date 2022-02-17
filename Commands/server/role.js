module.exports = {
  name: 'role',
  aliases: [],
  description: 'Adds or removes a role from a specified user.',
  userPermissions: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to specify a member, followed by a role to remove/add.")

    let re = /("|')(.*?)("|')/g
    let re2 = /"|'/g

    let compoundMatches = args.join(` `).match(re)?.map(m => m.replace(re2, ''));

    if (!(args.length >= 2) && !compoundMatches) return message.reply("You need to specify a member, followed by a role to remove/add.")
    if (compoundMatches && !args.join(` `).replace(args.join(` `).match(re), '').replace(/^ +/g, '')) return message.reply("You need to specify a member, followed by a role to remove/add.")

    let term_role;
    let term_user;
    
    if (compoundMatches?.length == 2) {
      term_user = compoundMatches[0]
      term_role = compoundMatches[1]
    } else if (args[0].match(re2) && compoundMatches?.length == 1) {
      term_user = compoundMatches[0]
      term_role = args.join(` `).replace(args.join(` `).match(re), '').replace(/^ +/g, '')
    } else if (!args[0].match(re2) && compoundMatches?.length == 1) {
      term_user = args[0]
      term_role = compoundMatches[0]
    } else if (!compoundMatches) {
      term_user = args[0]
      term_role = args.slice(1,args.length).join(` `)
    }
    
    user = await message.guild.members.fetch({ query: term_user, limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0])

    role = await message.guild.roles.cache.sort((a,b) => a.position - b.position).find(r => r.name.toLowerCase().includes(term_role.toLowerCase())) || await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id == args[1])
    
    if (!user) return message.reply("Member not found!")
    if (!role) return message.reply("Role not found!")

    if (message.guild.me.roles.highest.position <= role.position) return message.reply("I cannot access that role since it's above my highest role.")
    if (message.member.roles.highest.position <= role.position) return message.reply("You cannot access that role since it's above your highest role.")

    if (user.roles.cache.has(role.id)) {
      user.roles.remove(role)
      message.reply(`Removed **${role.name}** from **${user.displayName}**`)
    } else {
      user.roles.add(role)
      message.reply(`Added **${role.name}** to **${user.displayName}**`)
    }

  }
}