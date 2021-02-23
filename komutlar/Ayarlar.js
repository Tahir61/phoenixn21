const Discord = require("discord.js");

exports.run = async (client, message) => {
  let prefix = process.env.prefix;

  const fynxcode = new Discord.MessageEmbed()
    .setAuthor(`Phoenix Network | Ayarlar`)
    .setTitle(``)
    .setColor(`#ee7600`)
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    )
    .setDescription(
      `<a:tamir:812317605976735754> Phoenix Network Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Say__`,
      `<:ok:812318814578147338> \`${prefix}say\` Üyeleri Sayar Booster Üye & Çevrimçi vb.`,
      true
    )
    .addField(
      `__ModLog__`,
      `<:ok:812318814578147338> \`${prefix}modlog\` Mod Log Kanal Ayarlar.`,
      true
    )
    .addField(
      `__ModLog Sıfırla__`,
      `<:ok:812318814578147338> \`${prefix}modlog-sıfırla\` Mod Log Kanalı Sıfırlar.`,
      true
    )
    .addField(
      `__Küfür Engel__`,
      `<:ok:812318814578147338> \`${prefix}küfür-engel aç & kapat\` Küfür Edenleri Durdurur.`,
      true
    )
    .addField(
      `__Reklam Engel__`,
      `<:ok:812318814578147338> \`${prefix}reklam-engel aç & kapat\` Reklam Edenleri Durdurur.`,
      true
    )
    .addField(
      `__Temizle__`,
      `<:ok:812318814578147338> \`${prefix}temizle\` Yazdıgınız Sayı Kadar Mesaj Temizler.`,
      true
    )
    .addField(
      `__Rol Bilgi__`,
      `<:ok:812318814578147338> \`${prefix}rolbilgi\` Etiketlediğin Rolü Bilgilerini Gösterir.`,
      true
    )
    .addField(
      `__Yavaş Mod__`,
      `<:ok:812318814578147338> \`${prefix}yavaşmod [0/10]\` Kanal Yavaş Mod Ayarlar.`,
      true
    )
    .addField(
      `__Ban__`,
      `<:ok:812318814578147338> \`${prefix}ban\` Etiketlediğiniz Kişiyi Sunucudan Yasaklar.`,
      true
    )
    .addField(
      `__Kick__`,
      `<:ok:812318814578147338> \`${prefix}kick\` Etiketlediğiniz Kişiyi Sunucudan Atar.`,
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
  name: "ayarlar",
  description: "Yardım Menüsü",
  usage: "yardım"
};
