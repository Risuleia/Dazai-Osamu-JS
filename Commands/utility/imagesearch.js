const img = require('image-search-engine');

module.exports = {
  name: 'imagesearch',
  aliases: ['image', 'img', 'imgsearch'],
  description: 'Searches for images based on your query, and send the first result.',
  execute: async (client, message, args, db) => {
    const query = args.join(` `);
    if(!query) return message.reply('Please enter a search query');

    const result = await img.find(query, { size: 'large' });
    if (!result) return message.reply("No result found.")
    try {
      message.reply({
        files: [{ attachment: result, name: 'image.jpg' }],
        allowedMentions: { repliedUser: false }
      });
    } catch { err => console.log(err) }
  }
}