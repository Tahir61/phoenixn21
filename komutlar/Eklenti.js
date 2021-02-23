const Discord = require("discord.js");

exports.run = async (client, message) => {
  let prefix = process.env.prefix;

  const fynxcode = new Discord.MessageEmbed()
    .setAuthor(`Phoenix Network | Eklenti`)
    .setTitle(``)
    .setColor(`#ee7600`)
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    )
    .setDescription(
      `<a:tamir:812317605976735754> Phoenix Network Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Çekiliş Sistem__`,
      `<:ok:812318814578147338> \`${prefix}çekiliş-sistem\` Gelişmiş Çekiliş Sistemi`,
      true
    )
    .addField(
      `__Seviye Sistem__`,
      `<:ok:812318814578147338> \`${prefix}seviye-sistem\` Gelişmiş Seviye Sistemi`,
      true
    )
    .addField(
      `__Bilet & Ticket Sistem__`,
      `<:ok:812318814578147338> \`${prefix}ticket-sistem\` Gelişmiş Ticket & Bilet Sistemi`,
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
  name: "eklenti",
  description: "Yardım Menüsü",
  usage: "yardım"
};
