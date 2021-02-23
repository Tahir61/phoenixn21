const Discord = require("discord.js");

const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()

        .setTitle(`Uyarı`)

        .setDescription(
          `Bu Komutu Kullanmak İçin; \`Yönetici\` Yetkisine Sahip Olmalısın!`
        )
    );

  let p = process.env.prefix;

  if (!args[0]) {
    return message.channel.send(
      new Discord.MessageEmbed()

        .setColor(`#ee7600`)

        .setTitle(`${client.user.username} | Seviye-Rol Komutları!`)

        .setTimestamp()

        .setThumbnail(client.user.avatarURL())

        .setFooter(
          `${client.user.username} Seviye-Rol Sistemi!`,
          client.user.avatarURL()
        )

        .addField(
          `**__Rol Oluşturma__**`,
          `${p}seviye-rol @etiket <seviye>`,
          false
        )

        .addField(`**__Tüm Rolleri Silme__**`, `${p}seviye-rol temizle`, false)
    );
  }

  if (args[0] == "temizle" || args[0] == "clear") {
    db.delete(`srol.${message.guild.id}`);

    db.delete(`srol2.${message.guild.id}`);

    db.delete(`srol3.${message.guild.id}`);

    return message.channel.send(`Seviye-Rol Başarıyla Sıfırlandı!\n`);
  }

  if (isNaN(args[1]))
    return message.channel.send(
      `<a:olmaz:812330351333736460> Seviye bir sayı olmalı!`
    );

  var user = message.mentions.users.first() || message.author;

  var role = message.mentions.roles.first();

  db.push(`srol.${message.guild.id}`, role.id);

  db.set(`srol2.${message.guild.id}.${role.id}`, args[1]);

  db.push(`srol3.${message.guild.id}.${role.id}`, args[1]);

  message.channel.send(args[1] + " level " + role + " olarak ayarlandı!");
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0
};

exports.help = {
  name: "seviye-rol"
};
