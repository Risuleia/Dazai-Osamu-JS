module.exports = {
  name: 'muterole',
  aliases: [],
  description: 'Created a mute-role or sets one if specified.',
  userPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
  botPermissions: ['MANAGE_ROLES', 'MANAGE_CHANNELS'],
  execute: async (client, message, args, db) => {

    const muteRole = await db.get(`muterole_${message.guild.id}`);

    if (args[0] === 'add') {

      if (muteRole) return message.reply('A mute-role has already been set.')

      try {

        message.guild.roles.create({
          name: 'Muted',
          color: 'RED',
          reason: 'mute-role',
        }).then(role => {

          db.set(`muterole_${message.guild.id}`, role.id)

          message.guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.create(role, {
              SEND_MESSAGES: false
            })
          })

          message.reply(`Mute-role set to ${role}!`)

        })

      } catch {
        e => message.reply('Some error occured while trying to process your request.')
      }

    }

    if (args[0] === 'set') {

      // if (muteRole) return message.reply('A mute-role has already been set.')

      let targetRole;

      if (!isNaN(parseInt(args[0]))) {

        targetRole = await message.guild.roles.fetch(args[0]) || null;

        if (!targetRole) return message.reply("That role doesn't exist.")

        try {
          
          db.set(`muterole_${message.guild.id}`, targetRole.id)

          message.reply(`Mute-role set to ${targetRole}!`)

        } catch {
          e => message.reply("Some error occured while trying to process your request.") 
        }

      } else if (message.mentions) {
        
        targetRole = await message.mentions.roles.first() || null;

        if (!targetRole) return message.reply("That role doesn't exist.")

        try {
          
          db.set(`muterole_${message.guild.id}`, targetRole.id)

          message.reply(`Mute-role set to ${targetRole}!`)

        } catch {
          e => message.reply("Some error occured while trying to process your request.") 
        }

      }

    }

  }
}