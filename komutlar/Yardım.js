const Discord = require("discord.js");

exports.run = async (client, message) => {
  let prefix = process.env.prefix;

  const fynxcode = new Discord.MessageEmbed()
    .setAuthor(`PH | Phoenix Network`)
    .setTitle(``)
    .setColor(`#ee7600`)
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    )
    .setDescription(
      `<a:tamir:812317605976735754> Phoenix Network Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Genel Komutlar__`,
      `<:ok:812318814578147338> \`${prefix}genel\``,
      true
    )
    .addField(
      `__Moderasyon Komutları__`,
      `<:ok:812318814578147338> \`${prefix}ayarlar\` `,
      true
    )
    .addField(
      `__Sunucu Koruma__`,
      `<:ok:812318814578147338> \`${prefix}koruma\`  `,
      true
    )
    .addField(
      `__Sunucu Ayarlar__`,
      `<:ok:812318814578147338> \`${prefix}sunucu\` `,
      true
    )
    .addField(
      `__Eğlence Komutları__`,
      `<:ok:812318814578147338> \`${prefix}eğlence\`  `,
      true
    )
    .addField(
      `__Kullanıcı Komutları__`,
      `<:ok:812318814578147338> \`${prefix}kullanıcı\` `,
      true
    )
    .addField(
      `__Eklenti Komutları__`,
      `<:ok:812318814578147338> \`${prefix}eklenti\` Sistem Komutları Görürsünüz`,
      false
    )
    .addField(
      `__Bilgilendirme__`,
      `<a:fynx:812319545854263346>  \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n<a:fynx:812319545854263346> \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz \n <a:fynx:812319545854263346> \`${prefix}siteler\` | Phoenix Network Botların Sitelerini Gösterir`
    );
  return message.channel.send(fynxcode);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: `Geliştirici`
};

exports.help = {
  name: "yardım",
  description: "Yardım Menüsü",
  usage: "yardım"
};
