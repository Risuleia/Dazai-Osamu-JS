const client = require("../index");
const moment = require('moment');

client.on('messageCreate', async msg => {

  if (!msg.guild || msg.author.bot) return

  const mention = msg.mentions.members.first();

  if (mention) {

    const afk = client.afk.get(`${msg.guild.id}_${mention.id}`)

    if (afk) {
      const [timestamp, reason] = afk;
      const timeAgo = moment(timestamp).fromNow();

      msg.reply({
        content: `${mention.nickname || mention.user.username} is AFK (${timeAgo}): ${reason}`,
        allowedMentions: { repliedUser: false }
      }).then(message => setTimeout(() => message.delete(), 2000))
    }

  }

  const isAFK = client.afk.get(`${msg.guild.id}_${msg.author.id}`)
  if (isAFK) {

    client.afk.delete(`${msg.guild.id}_${msg.author.id}`);

    msg.reply(`${msg.member.nickname || msg.author.username}, I have removed your AFK!`).then(message => setTimeout(() => message.delete(), 2000));

    if (msg.guild.me.permissions.has('MANAGE_NICKNAMES') && msg.member.manageable) {
      msg.member.setNickname(msg.member.nickname.replace('[AFK] ', ''))
    }

  }

})