const { MessageActionRow, MessageButton } = require('discord.js');
const { getPreview, getData } = require('spotify-url-info')

module.exports = {
  name: 'spotify',
  aliases: ['sf'],
  description: "Shows a user's currently playing song.",
  execute: async (client, message, args, db) => {

    let user = !args[0] ? await message.member : await message.guild.members.fetch({ query: args[0], limit: 1 }).then(members => members.first()) || await message.mentions.members.first() || await message.guild.members.cache.find(u => u.id == args[0]);

    if (!user) return message.reply("Member not found.")

    let activity = user.presence.activities?.find(activity => activity.name === "Spotify" && activity.type === 'LISTENING') || null;

    if (!activity) {
      
      const spotifyEmbed = {
        color: 0x1ED760,
        author: {
          name: "Not listening to anything currently!",
          icon_url: "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
        }
      }

      message.reply({
        embeds: [spotifyEmbed],
        allowedMentions: { repliedUser: false }
      })

    } else {
      
      // await getData(`https://open.spotify.com/track/${activity.syncId}`).then(data => console.log(data))
      const data = await getData(`https://open.spotify.com/track/${activity.syncId}`)

      const artists = data.artists.map(artist => `[${artist.name}](${artist.external_urls.spotify})`)

      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Listen Along')
					.setStyle('LINK')
          .setURL(data.external_urls.spotify)
			);

      const spotifyEmbed = {
        color: 0x1ED760,
        author: {
          name: `${user.displayName} is listening to...`,
          icon_url: "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png"
        },
        description: `**[${data.name}](${data.external_urls.spotify})** by **${artists.join(', ')}**\non [${data.album.name}](${data.album.external_urls.spotify})`,
        thumbnail: { url: activity.assets.largeImageURL({ format: 'png', size: 512 }) },
        footer: {
          text: user.user.tag,
          icon_url: user.displayAvatarURL({ dynamic: true })
        },
        timestamp: new Date()
      }

      message.reply({
        embeds: [spotifyEmbed],
        components: [row],
        allowedMentions: { repliedUser: false }
      })

    }

  }
}