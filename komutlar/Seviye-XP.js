const Discord = require("discord.js");

const db = require("quick.db");

exports.run = async (client, msg, args) => {
  if (!msg.member.hasPermission("ADMINISTRATOR"))
    return msg.channel.send(
      new Discord.MessageEmbed()

        .setTitle(`Uyarı`)

        .setDescription(
          `<a:olmaz:812330351333736460> Bu Komutu Kullanmak İçin; \`Yönetici\` Yetkisine Sahip Olmalısın!`
        )
    );

  if (args[0] == "sıfırla" || args[0] == "reset") {
    db.delete(`seviyexp${msg.guild.id}`);

    return msg.channel.send(
      `<a:olur:812342891774345266> Seviye-XP sıfırlandı! Default: \`5\``
    );
  }

  let sayı = args[0];

  if (!sayı)
    return msg.channel.send(
      "<a:olmaz:812330351333736460> Lütfen Bir Sayı Giriniz!"
    );

  if (sayı > 20)
    return msg.channel.send(
      "<a:olmaz:812330351333736460> Max 20 Olarak Ayarlıyabilirsin."
    );

  db.set(`seviyexp${msg.guild.id}`, Math.floor(args[0]));

  return msg.channel.send(
    "<a:olur:812342891774345266> Başarıyla Seviye Puanını `" +
      args[0] +
      "` Olarak Ayarladınız!"
  );
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0
};

exports.help = {
  name: "seviye-xp"
};
