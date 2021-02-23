const Discord = require("discord.js");

exports.run = async (client, message) => {
  let prefix = process.env.prefix;

  const fynxcode = new Discord.MessageEmbed()
 .setAuthor(`Phoenix Network | Koruma`)
    .setTitle(``)
    .setColor(`#ee7600`)
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    )
    .setDescription(
      `<a:tamir:812317605976735754> Phoenix Network Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Rol Koruma__`,
      `<:ok:812318814578147338> \`${prefix}rol-koruma aç & kapat\` Rol Koruma Sistemini Açar`,
      true
    )
  .addField(
      `__Kanal Koruma__`,
      `<:ok:812318814578147338> \`${prefix}kanal-koruma aç & kapat\` Kanal Koruma Sistemini Açar`,
      true
    )
  .addField(
      `__Bot Koruma__`,
      `<:ok:812318814578147338> \`${prefix}bot-koruma aç & kapat\` Bot Koruma Sistemini Açar`,
      true
    )
  .addField(
      `__Bot İzni__`,
      `<:ok:812318814578147338> \`${prefix}bot-izni ver & kaldır\` Bot İzni Verirsin`,
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
  name: "koruma",
  description: "Yardım Menüsü",
  usage: "yardım"
};
