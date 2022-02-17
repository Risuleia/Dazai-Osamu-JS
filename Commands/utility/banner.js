module.exports = {
  name: 'banner',
  aliases: [],
  description: 'Displays the banner of a specified user.',
  execute: async (client, message, args, db) => {
    
    if (args.length === 0) return message.reply({
      embeds: [{
        color: 0xffcba4,
        title: message.author.banner ? `Banner for ${message.author.tag}` : "Banner not available",
        image: { url: message.author.banner ? await message.author.bannerURL({ size: 2048, dynamic: true }) : null },
      }],
      allowedMentions: { repliedUser: false }
    })

    let target = await client.users.fetch(args[0] || message.mentions.members.first()?.id || message.member.id, { force: true }) || null;
    
    let banner = target.banner ? await target.bannerURL({ size: 2048, dynamic: true }) : null;

    const bannerEmbed = {
      color: 0xffcba4,
      title: target.banner ? `Banner for ${target.username}#${target.discriminator}` : "Banner not available",
      image: { url: banner },
    }

    try {
      message.reply({
        embeds: [bannerEmbed],
        allowedMentions: { repliedUser: false }
      })
    } catch { err => console.log(err) }

  }
}