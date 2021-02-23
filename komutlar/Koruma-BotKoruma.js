const Discord = require("discord.js");
const db = require("quick.db");
let prefix = process.env.prefix;
exports.run = (client, message, args) => {
  if (args[0] == "aç") {
    if (db.has(`antiraidK_${message.guild.id}`) === true) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor(`#ee7600`)
          .setDescription(
            "<a:olmaz:812330351333736460> Bot koruma sistemi zaten açılmış."
          )
      );
    }
    db.set(`antiraidK_${message.guild.id}`, "bot-koruma aç");
    const açıldı = new Discord.MessageEmbed()
      .setColor(`#ee7600`)
      .setDescription(
        "<a:olur:812342891774345266> Bot koruma sistemi başarıyla açıldı"
      );
    message.channel.send(açıldı);
  }

  if (args[0] == "kapat") {
    if (db.has(`antiraidK_${message.guild.id}`) === false) {
      const kapat2 = new Discord.MessageEmbed()
        .setColor(`#ee7600`)
        .setDescription(
          "<a:olmaz:812330351333736460> Bot koruma sistemi açılmamış. Açmak için **bot-koruma aç**"
        );
      return message.channel.send(kapat2);
    }
    db.delete(`antiraidK_${message.guild.id}`, "bot-koruma aç");
    const botkorumakapatıldı = new Discord.MessageEmbed()
      .setColor(`#ee7600`)
      .setDescription(
        "<a:olur:812342891774345266> Bot koruma sistemi başarıyla kapatıldı"
      );
    message.channel.send(botkorumakapatıldı);
  }
  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(`#ee7600`)
        .setDescription(
          `<a:olmaz:804776145223811173> Lütfen geçerli işlem girin. Örnek: **${prefix}bot-koruma aç/kapat**`
        )
    );
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bot-koruma"],
  permLevel: 0
};
exports.help = {
  name: "bot-koruma"
};
