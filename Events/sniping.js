const client = require('../index');

// sniping function (shows deleted messages)

  // delete snipes
  client.on('messageDelete', message => {
    if (message.author.bot) return;

    let snipes = client.snipes.get(message.channel.id) || [];

    snipes.unshift({
      msg: message,
      image: message.attachments.first()?.proxyURL || null,
      time: Date.now()
    });

    client.snipes.set(message.channel.id, snipes)
  });