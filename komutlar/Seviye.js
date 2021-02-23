const Discord = require("discord.js");

const db = require("quick.db");
const prefix = process.env.prefix;

exports.run = async (client, message, args) => {
  var user = message.mentions.users.first() || message.author;

  var id = user.id;

  var gid = message.guild.id;

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var xpToLvl = await db.fetch(`xpToLvl_${id}_${gid}`);

  let u = message.mentions.users.first() || message.author;

  if (u.bot === true) {
    message.channel.send(
      new Discord.MessageEmbed()

        .setDescription("Botların seviyesi bulunmamaktadır!")

        .setColor(`#ee7600`)
    );
  } else
    message.channel.send(
      new Discord.MessageEmbed()

        .setColor(`#ee7600`)
        .setThumbnail(
          "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
        )

        .setAuthor(`${user.username}`)

        .setTitle(`**__Seviye Bilgi :__**`)

        .addField(
          `**__Kullanıcı__**  <a:rainbow:812348672036831253>`,
          `<@${user.id}>`,
          false
        )

        .addField(
          `**__Kullanıcı XP Değeri__** <:phoenix2:812734272473006120>`,
          `**${xp || 0}**`,
          false
        )

        .addField(
          `**__Kullanıcı Seviye Değeri__** <a:plak:812348906629365860>`,
          `**${lvl || 0}**`,
          false
        )
        .addField(
          `__Bilgilendirme__`,
          `<a:fynx:812319545854263346>  \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n<a:fynx:812319545854263346> \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz \n <a:fynx:812319545854263346> \`${prefix}siteler\` | Phoenix Network Botların Sitelerini Gösterir`
        )
        .setFooter(
          `${client.user.username} Seviye Sistemi!`,
          client.user.avatarURL()
        )

        .setTimestamp()
    );
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0
};

exports.help = {
  name: "seviye"
};
