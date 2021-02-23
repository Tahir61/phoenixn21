const { MessageEmbed } = require("discord.js");
module.exports.run = (client, message, args) => {
  if (
    !["ROL ID"].some(role => message.member.roles.cache.get(role)) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send(
      new MessageEmbed()
        .setColor(`#ee7600`)
        .setAuthor(`Başarısız !`)
        .setDescription(`Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta  `)
    );

  let tag = "TAG";
  const booster = message.guild.roles.cache.get("812346841533906974").members
    .size;
  const online = message.guild.members.cache.filter(
    u => u.presence.status != "offline"
  ).size;
  const toplam = message.guild.memberCount;
  const ses = message.guild.channels.cache
    .filter(channel => channel.type == "voice")
    .map(channel => channel.members.size)
    .reduce((a, b) => a + b);

  const embed = new MessageEmbed()
    .setTimestamp()
    .setColor("BLUE")
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }));
  message.channel.send(
    embed.setDescription(`**<a:kilit:812347083599511593> Toplam Üye  ・ ${toplam}
  <a:rainbow:812348672036831253> Booster Üye ・${booster}
  <a:plak:812348906629365860> Sesteki Üye ・${ses}**`)
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["say"],
  permLvl: 0
};

exports.help = {
  name: "say"
};
