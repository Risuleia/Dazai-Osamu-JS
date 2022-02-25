const { MessageActionRow, MessageButton } = require("discord.js");
const { bold } = require("@discordjs/builders");

module.exports = {
  name: 'roledelete',
  aliases: ['rd'],
	usage: "<role-mention/role-name/role-id>",
  description: 'Deletes a role from the server.',
  userPermissions: ['ADMINISTRATOR'],
  botPermissions: ['MANAGE_ROLES'],
  execute: async (client, message, args, db) => {

    if (!args.length) return message.reply("You need to specify a role to delete")

    let role = await message.guild.roles.cache.sort((a,b) => a.position - b.position).find(r => r.name.toLowerCase().includes(args.join(` `).toLowerCase())) || await message.mentions.roles.first() || await message.guild.roles.cache.find(r => r.id == args[0])
		
    if (!role) return message.reply("Role not found!")

    if (message.guild.me.roles.highest.position <= role.position) return message.reply("I cannot access that role since it's above my highest role.")
    if (message.member.roles.highest.position <= role.position) return message.reply("You cannot access that role since it's above your highest role.")

		role.delete()
		
		message.channel.send({
			embeds: [{
				color: role.hexColor.toString(),
				title: 'Role Deleted!',
				description: `${bold('Name:')} ${role.name}\n${bold('Color:')} ${role.hexColor.toUpperCase()}`,
				footer: { text: `ID: ${role.id}` },
				timestamp: new Date()
			}],
			reply: { messageReference: message.id }
		})
		
  }
}