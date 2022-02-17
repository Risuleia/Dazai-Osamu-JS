const client = require('../index');

// editsniping (shows edited messages)
  // edit snipes

  client.on('messageUpdate', message => {
    
    if (message.author.bot) return;

    if (message.embeds) return;
    
    let esnipes = client.edit_snipes.get(message.channel.id) || [];
    console.log(esnipes)

    esnipes.unshift({
      msg: message,
      image: message.attachments.first()?.proxyURL || null,
      time: Date.now()
    });

    client.edit_snipes.set(message.channel.id, esnipes)
  })