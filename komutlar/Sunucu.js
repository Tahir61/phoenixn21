const Discord = require("discord.js");
const db = require("quick.db");

var prefix = process.env.prefix;

module.exports.run = async (client, message, args) => {
  const modlog = await db.fetch(`modlogkanaly_${message.guild.id}`);
  const reklam = await db.fetch(`reklam_${message.guild.id}`);
  const küfür = await db.fetch(`kufur_${message.guild.id}`);
  const rolkoruma = await db.fetch(`rolk_${message.guild.id}`);
  const kanalkoruma = await db.fetch(`kanalk_${message.guild.id}`);
  const botkoruma = await db.fetch(`antiraidK_${message.guild.id}`);
    const seviyekanal = await db.fetch(`seviyekanal${message.guild.id}`);

  let sayfalar = [
    `
> <a:tamir:812317605976735754> Sunucu Ayarları  
  
> <a:tamir:812317605976735754> **ModLog-Sistemi**: ${
      modlog
        ? "<a:olur:812342891774345266>**``| Ayarlandı``**"
        : "<a:olmaz:812330351333736460> **``| Ayarlanmadı``**"
    }
> <a:tamir:812317605976735754> **Reklam-Engelle**: ${
      reklam
        ? "<a:olur:812342891774345266> **``| Ayarlandı``**"
        : "<a:olmaz:812330351333736460> **``| Ayarlanmadı``**"
    }
> <a:tamir:812317605976735754> **Küfür-Engelle**: ${
      küfür
        ? "<a:olur:812342891774345266> **``| Ayarlandı``**"
        : "<a:olmaz:812330351333736460> **``| Ayarlanmadı``**"
    }
> <a:tamir:812317605976735754> **Rol-Koruma**: ${
      rolkoruma
        ? "<a:olur:812342891774345266> **``| Ayarlandı``**"
        : "<a:olmaz:812330351333736460> **``| Ayarlanmadı``**"
    }
  > <a:tamir:812317605976735754> **Kanal-Koruma**: ${
    kanalkoruma
      ? "<a:olur:812342891774345266> **``| Ayarlandı``**"
      : "<a:olmaz:812330351333736460> **``| Ayarlanmadı``**"
  }
  > <a:tamir:812317605976735754> **Bot-Koruma**: ${
    botkoruma
      ? "<a:olur:812342891774345266> **``| Ayarlandı``**"
      : "<a:olmaz:812330351333736460> **``| Ayarlanmadı``**"
  }
  > <a:tamir:812317605976735754> **Seviye-Kanal**: ${
    seviyekanal
      ? "<a:olur:812342891774345266> **``| Ayarlandı``**"
      : "<a:olmaz:812330351333736460> **``| Ayarlanmadı``**"
  }

`
  ];
  let page = 1;

  const embed = new Discord.MessageEmbed()
    .setTitle("Phoenix Network Sunucu Ayarlar Sistemi")
    .setColor(`#ee7600`)
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    )
    .setFooter(`Phoenix | Sunucu Ayarlar`)
    .setDescription(sayfalar[page - 1]);

  message.channel.send(embed).then(msg => {
    msg.react("797033410484109323").then(r => {
      msg.react("797033472274464779");

      const backwardsFilter = (reaction, user) =>
        reaction.emoji.name === "sol" && user.id === message.author.id;
      const forwardsFilter = (reaction, user) =>
        reaction.emoji.name === "RainbowOkGif" && user.id === message.author.id;

      const backwards = msg.createReactionCollector(backwardsFilter, {
        time: 60000
      });
      const forwards = msg.createReactionCollector(forwardsFilter, {
        time: 60000
      });

      backwards.on("collect", r => {
        if (page === 1) return;
        page--;
        embed.setTitle("Phoenix Network Sunucu Ayarlar Sistemi");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor(`#ee7600`);
        msg.edit(embed);
      });

      forwards.on("collect", r => {
        if (page === sayfalar.length) return;
        page++;
        embed.setTitle("Phoenix Network Sunucu Ayarlar Sistemi");
        embed.setDescription(sayfalar[page - 1]);
        embed.setFooter(`Sayfa ${page} - ${sayfalar.length}`);
        embed.setColor("BLUE");
        msg.edit(embed);
      });
    });
  });
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-sistemi", "", "", ""],
  permLevel: 0
};

module.exports.help = {
  name: "sunucu",
  description: "Sunucu ayarlarını gösterir.",
  usage: "ayarlar"
};
