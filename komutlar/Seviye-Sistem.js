const Discord = require("discord.js");
const moment = require("moment");
const db = require("quick.db");
const client = new Discord.Client();
require("moment-duration-format");
const prefix = process.env.prefix;
exports.run = async (bot, msg, args) => {
  const seviye = new Discord.MessageEmbed()
    .setAuthor(`Phoenix Network | Seviye Sistem`)
    .setTitle(``)
    .setColor(`#ee7600`)
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    )
    .setDescription(
      `<a:tamir:812317605976735754> Phoenix Network Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `**__Seviye Kullanıcı__**`,
      `<:ok:812318814578147338> \`${prefix}seviye\` \nKullanıcı Seviyesi Görür.`,
      true
    )

    .addField(
      `**__Seviye Ayarlar__**`,
      `<:ok:812318814578147338> \`${prefix}seviye-ayarlar\` \nSeviye Sistem Ayarları Görürsünüz.`,
      true
    )
    .addField(
      `**__Seviye Rol__**`,
      `<:ok:812318814578147338>  \`${prefix}seviye-rol\` \nSeviye Rol Komutları Görürsünüz.`,
      true
    )
    .addField(
      `**__Seviye Sıfırla__**`,
      `<:ok:812318814578147338>  \`${prefix}seviye-sıfırla\` \nSeviye Tüm Ayarlarını Sıfırlar`,
      true
    )
    .addField(
      `**__Seviye Sınır__**"`,
      `<:ok:812318814578147338>  \`${prefix}seviye-sınır\` \nSeviye Sınır Eklersin`,
      true
    )
    .addField(
      `**__Seviye Top__**`,
     `<:ok:812318814578147338>  \`${prefix}seviye-top\` \nSeviye İlk 5 Kişiyi Gösterir`,
      true
    )
    .addField(
      `**__Seviye XP__**`,
      `<:ok:812318814578147338>  \`${prefix}seviye-xp\` \nSeviye XP Ayarlama`,
      true
    )
    .addField(
      `**__Seviye Log__**`,
      `<:ok:812318814578147338>  \`${prefix}seviye-log\` \nSeviye Kanal Ayarlar`,
      false
    )
    .addField(
      `__Bilgilendirme__`,
      `<a:fynx:812319545854263346>  \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n<a:fynx:812319545854263346> \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz \n <a:fynx:812319545854263346> \`${prefix}siteler\` | Phoenix Network Botların Sitelerini Gösterir`
    );
  msg.channel.send(seviye);
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["", ""],
  permLevel: 0
};
exports.help = {
  name: "seviye-sistem",
  description: "İstediğiniz kullanıcını bilgilerini gösterir.",
  usage: "seviye"
};
