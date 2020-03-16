const Discord = require("discord.js");
const keyword = require("./keyword.js");
const contract = require("./NicoContact.js");
const { Client, Attachment } = require("discord.js");
const client = new Client();
var servers = {};
const ytdl = require("ytdl-core");
const PREFIX = "<3";
const haii = "";
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
  const a = msg.content.toLowerCase();
  if (
    a.includes(keyword.hello) ||
    a.includes(keyword.helo) ||
    a.includes(keyword.lo) ||
    a.includes(keyword.he_lo) ||
    a.includes(keyword.halo) ||
    a.includes(keyword.ha_lo) ||
    a.includes(keyword.ha_loTV)
  ) {
    msg.reply("lô lô con ... à mà thôi idol không được nói bậy");
  }

  if (
    (a.includes(keyword.yeu) && !msg.author.bot) ||
    (a.includes(keyword.y3u) &&
      !msg.author.bot &&
      !a.includes(contract.love)) ||
    (a.includes(keyword.love) && !msg.author.bot)
  ) {
    msg.channel.send(`yêu đương cái gì hả ${msg.author}!!`);
  }
  //${msg.author}
  if (
    a.includes(keyword.ngu) ||
    a.includes(keyword.sua) ||
    a.includes(keyword.suatv) ||
    (a.includes(keyword.gay) && !msg.author.bot) ||
    (a.includes(keyword.gaytv) && !msg.author.bot) ||
    a.includes(keyword.im) ||
    a.includes(keyword.ga1) ||
    a.includes(keyword.xam) ||
    a.includes(keyword.xam1)
  ) {
    msg.reply("Gáy sớm ăn gì");
  }

  if (
    (a.includes(keyword.vl) && a.includes(keyword.wibu) && !msg.author.bot) ||
    (a.includes(keyword.dm) && a.includes(keyword.wibu) && !msg.author.bot) ||
    (a.includes(keyword.cac) && a.includes(keyword.wibu) && !msg.author.bot) ||
    (a.includes(keyword.cacTV) &&
      a.includes(keyword.wibu) &&
      !msg.author.bot) ||
    (a.includes(keyword.lonTV) &&
      a.includes(keyword.wibu) &&
      !msg.author.bot) ||
    (a.includes(keyword.lonz) && a.includes(keyword.wibu) && !msg.author.bot) ||
    (a.includes(keyword.lol) && a.includes(keyword.wibu) && !msg.author.bot) ||
    (a.includes(keyword.cc) && a.includes(keyword.wibu) && !msg.author.bot) ||
    (a.includes(keyword.duma) && a.includes(keyword.wibu) && !msg.author.bot) ||
    (a.includes(keyword.du_ma) &&
      a.includes(keyword.wibu) &&
      !msg.author.bot) ||
    (a.includes(keyword.du_maTV) && a.includes(keyword.wibu) && !msg.author.bot)
  ) {
    msg.channel.send(`mày tính làm j hả ${msg.author}, wibu thì làm sao nào`);
  } else {
    if (
      a.includes(keyword.vl) ||
      a.includes(keyword.dm) ||
      a.includes(keyword.cac) ||
      a.includes(keyword.cacTV) ||
      a.includes(keyword.lonTV) ||
      a.includes(keyword.lonz) ||
      a.includes(keyword.lol) ||
      a.includes(keyword.cc) ||
      a.includes(keyword.duma) ||
      a.includes(keyword.du_ma) ||
      a.includes(keyword.du_maTV)
    ) {
      msg.channel.send(`mày nói cái j cơ hả ${msg.author} `);
    }
  }

  if (a.includes(contract.call)) {
    // Create the attachment using Attachment
    const attachment = new Attachment("https://i.imgur.com/lqSm7gk.gif");
    // Send the attachment in the message channel

    msg.channel.send(attachment);
    msg.channel.send(`Yazawa Nico có mặt, có chuyện gì ak ${msg.author}`);
  }

  if (a.includes(keyword.keyword)) {
    msg.reply("ơi");
  }

  if (msg.author === "660117387236081745") {
    msg.channel.send(`Cứ nói đi, t éo quan tâm đâu ${msg.author}`);
  }

  if (a.includes(contract.love)) {
    const attachment = new Attachment("https://i.imgur.com/JG77lxA.gif");

    msg.channel.send(
      `Nico Yazawa cũng yêu ${msg.author} lắm nè <3 :heartbeat: `
    );
    msg.channel.send(attachment);
  }
});

client.on("message", message => {
  if (!message.guild) return;

  if (message.content === "nico nico nii") {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel
        .join()
        .then(connection => {
          // Connection is an instance of VoiceConnection
          message.channel.send("Nico-Nico-Nii!");
        })
        .catch(console.log);
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
});

client.on("message", message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "play":
      function play(connection, message) {
        var server = servers[message.guild.id];

        server.dispatcher = connection.playStream(
          ytdl(server.queue[0], { filter: "audioonly" })
        );

        server.queue.shift();

        server.dispatcher.on("end", function() {
          if (server.queue[0]) {
            play(connection, message);
          } else {
            connection.disconnect();
          }
        });
      }

      if (!args[1]) {
        message.channel.send("you need provide a link");
        return;
      }

      if (!message.member.voiceChannel) {
        message.channel.send(" you must in the voice chanel");
        return;
      }

      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: []
        };

      var server = servers[message.guild.id];

      server.queue.push(args[1]);

      if (!message.guild.voiceConnection)
        message.member.voiceChannel.join().then(function(connection) {
          play(connection, message);
        });

      break;
  }
});

// client.on('message', message => {

//
// });

client.login("NjYyOTA1MTc4NDgzMzI2OTc2.XhA3FA.sU-cUXEB_8KyCpm48DwM2DrN4vQ");
