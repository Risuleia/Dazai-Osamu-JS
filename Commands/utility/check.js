module.exports = {
  name: 'check',
  aliases: [],
  execute: async (client, message, args, db) => {

		if (message.member.id != '693623099710505041') return message.channel.send({
			content: 'This command is not intended for common use, and is meant to be only used by the devs.',
			reply: { messageReference: message.id }
		})

    function isEmpty(collection) {
      if (Array.from(collection).length > 0) {
        return false
      }
      return true
    }

    let userQuery = await message.guild.members.fetch({ query: args[0], limit: 1 });

    let target = !args[0] ? await message.member : await message.guild.members.fetch({ query: args[0], limit: 1}, {force: true}).then(members => members.first()) || await message.mentions.members.first() || args[0];
    
    console.log(await target)

  }
}