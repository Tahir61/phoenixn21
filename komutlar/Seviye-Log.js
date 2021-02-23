const Discord = require("discord.js");

const db = require("quick.db");

let prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()

        .setTitle(`Uyarı`)

        .setDescription(
          `<a:olmaz:812330351333736460> Bu Komutu Kullanmak İçin; \`ADMINISTRATOR\` Yetkisine Sahip Olmalısın!`
        )
    );

  if (args[0] == "sıfırla") {
    db.delete(`seviyekanal${message.guild.id}`);

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(`#ee7600`)
        .setDescription(`<a:olur:812342891774345266> Seviye-Log sıfırlandı!`)
    );
  }

  if (args[0]) {
    let akanal =
      message.mentions.channels.first() ||
      message.guild.channels.cache.find(
        ff => ff.name === args.slice(1).join(" ")
      );

    db.set(`seviyekanal${message.guild.id}`, akanal.id);

    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(`#ee7600`)
        .setDescription(
          `<a:olur:812342891774345266> Seviye Log Kanalı Ayarlandı! Ayarlanan Kanal: <#${akanal.id}> Sıfırlamak için ${prefix}seviye-log sıfırla`
        )
    );
  }
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0
};

exports.help = {
  name: "seviye-log"
};