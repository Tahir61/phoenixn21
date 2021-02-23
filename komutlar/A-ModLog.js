const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();
client.emojis.cache.get("784518934711762976");
client.emojis.cache.get("784518943423463484");

const prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.reply(
      `<a:olmaz:812330351333736460> **Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!**`
    );

  let modlogs = db.get(`modlogkanaly_${message.guild.id}`);

  if (!modlogs) {
    let kanal = message.mentions.channels.first();
    if (!kanal)
      return message.reply(
        `<a:olmaz:812330351333736460> **Lütfen bir kanal giriniz!** \n> **Doğru Kullanım;** \`${prefix}mod-log <#kanal>\``
      );

    db.set(`modlogkanaly_${message.guild.id}`, kanal.id);
    const modlogkanal = message.guild.channels.cache.find(
      kanal => kanal.id === modlogs
    );
    const mdlgayar = new Discord.MessageEmbed()
       .setColor(`#ee7600`)
      .setDescription(
        `<a:olur:812342891774345266> **Modlog kanalı başarılı bir şekilde ayarlandı.**`
      );
    message.channel.send(mdlgayar);
  } else {
    if (modlogs) {
      const modlogkanal = message.guild.channels.cache.find(
        kanal => kanal.id === modlogs
      );
      const mdlgsfr = new Discord.MessageEmbed()
         .setColor(`#ee7600`)
        .setDescription(
          `<a:olmaz:812330351333736460> **Bu sunucuda daha önceden modlog kanalı ayarlanmış. Sıfırlamak için:** \`${prefix}mod-log-sıfırla\`\n**Ayarlanan kanal:** \`${modlogkanal.name}\``
        );
      return message.channel.send(mdlgsfr);
    }
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["modlog"],
  permLevel: 0
};

exports.help = {
  name: "mod-log",
  description: "Log kanalını belirler.",
  usage: "mod-log-ayarla <#kanal>"
};
