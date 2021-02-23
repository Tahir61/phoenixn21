const Discord = require("discord.js");
const fs = require("fs");
let prefix = process.env.prefix;

exports.run = (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()

      .setAuthor("UYARI")
      .setColor(`#ee7600`)
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(
        "Lütfen bu komudu özelde kullanmak yerine ekli olduğum sunucuda kullan."
      );

    return message.author.send(ozelmesajuyari);
  }

  let guild = message.guild;
  let reason = args.slice(1).join(" ");
  let dızcılaraselam = message.mentions.users.first();

  if (message.mentions.users.size < 1)
    return message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor(`#ee7600`)
          .setDescription(`Lütfen Sunucudan Atacağınız Kişiyi Etiketleyin.`)
      )
      .catch(console.error);

  if (!message.guild.member(dızcılaraselam).bannable)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(`#ee7600`)
        .setDescription(`Belirttiğiniz kişinin Yetkisi Benden Daha Üstün!`)
    );

  message.guild.member(dızcılaraselam).kick();

  message.channel.send(
    " Başarılı, " +
      dızcılaraselam +
      " İD'li kullanıcı **" +
      reason +
      "** sebebiyle sunucudan atıldı."
  );
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["at"],
  permLevel: 3
};

exports.help = {
  name: "kick",
  description: "İstediğiniz kişiyi sunucudan atar.",
  usage: "kick <@kullanıcı> <sebep>"
};
