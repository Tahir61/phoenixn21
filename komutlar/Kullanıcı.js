const Discord = require("discord.js");

exports.run = async (client, message) => {
  let prefix = process.env.prefix;

  const fynxcode = new Discord.MessageEmbed()
    .setAuthor(`Phoenix Network | Kullanıcı`)
    .setTitle(``)
    .setColor(`#ee7600`)
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    )
    .setDescription(
      `<a:tamir:812317605976735754> Phoenix Network Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Komut Sayısı__`,
      `<:ok:812318814578147338> \`${prefix}komutlar\` Botun Komut Sayısını Gösterir`,
      true
    )
    .addField(
      `__Davet Et__`,
      `<:ok:812318814578147338> \`${prefix}davet\` Botumuzu Davet Edersiniz`,
      true
    )
    .addField(
      `__Bot Bilgi__`,
      `<:ok:812318814578147338> \`${prefix}botbilgi\` Botumuzun İstatistikleri`,
      true
    )
    .addField(
      `__Profil__`,
      `<:ok:812318814578147338> \`${prefix}profil\` Kullanıcı Profilinizi Gösterir`,
      true
    )
    .addField(
      `__Oylama__`,
      `<:ok:812318814578147338> \`${prefix}oylama\` Sunucuda Oylama Başlatır`,
      true
    )
    .addField(
      `__Siteler__`,
      `<:ok:812318814578147338> \`${prefix}siteler\` Phoenix Network Siteleri`,
      true
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
  name: "kullanıcı",
  description: "Yardım Menüsü",
  usage: "yardım"
};
