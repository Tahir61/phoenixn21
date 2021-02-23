const Discord = require("discord.js");

const db = require("quick.db");

exports.run = async (client, message, args) => {
  let kanal = await db.fetch(`seviyekanal${message.guild.id}`);

  let xp = await db.fetch(`seviyexp${message.guild.id}`);

  let sınır = await db.fetch(`seviyesınır${message.guild.id}`);

  let kanal1 = [];

  if (kanal) kanal1 = `<a:olur:812342891774345266> **Açık!**`;

  if (!kanal) kanal1 = `<a:olmaz:812330351333736460> **Kapalı!**`;

  let xp1 = [];

  if (xp) xp1 = `<a:olur:812342891774345266> \`${xp}\``;

  if (!xp) xp1 = `<a:olmaz:812330351333736460> **Ayarlanmamış! Default: \`250\`**`;

  let sınır1 = [];

  if (sınır) sınır1 = `<a:olur:812342891774345266>  \`${sınır}\``;

  if (!sınır)
    sınır1 = `<a:olmaz:812330351333736460> **Ayarlanmamış! Default: \`5\`**`;

  message.channel.send(
    new Discord.MessageEmbed()

       .setColor(`#ee7600`)

      .setTitle(`Phoenix Network Seviye-Sistem Ayarları`)

      .addField(`**__Mesaj Başı Verilecek XP__**`, `${xp1}`, false)

      .addField(`**__Kaç Puan Seviye Atlama__**`, `${sınır1}`, false)
  );
};

exports.conf = {
  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 0
};

exports.help = {
  name: "seviye-ayarlar"
};
