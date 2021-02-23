const Discord = require("discord.js");

const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()

        .setTitle(`Uyarı`)

        .setDescription(
          `<a:olmaz:812330351333736460> Bu Komutu Kullanmak İçin; \`Yönetici\` Yetkisine Sahip Olmalısın!`
        )
    );

  db.delete(`seviyesınır${message.guild.id}`);

  db.delete(`seviyexp${message.guild.id}`);

  db.delete(`seviyekanal${message.guild.id}`);

  return message.channel.send(
    new Discord.MessageEmbed()

      .setColor(`#ee7600`)

      .setThumbnail(client.user.avatarURL())

      .setDescription(
        `<a:olur:812342891774345266> Seviye-Sistemi Bütün Ayarlamaları Sıfırlandı!`
      )

      .setFooter(`${client.user.username} Seviye Sistemi!`)
  );
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0
};

exports.help = {
  name: "seviye-sıfırla"
};
