const Discord = require("discord.js");
const client = new Discord.Client();
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");
require("./util/eventLoader.js")(client);
const db = require("quick.db");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

//-----------------------------------------------\\
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " PİNGLENDİ ");
  response.sendStatus(200);
});
app.listen(8000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//-----------------------------------------------\\

var prefix = process.env.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === process.env.sahip3) permlvl = 4;
  if (message.author.id === process.env.sahip2) permlvl = 4;
  if (message.author.id === process.env.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(process.env.TOKEN);

//---------------------------------|Mod-Log Sistemi Başlangıç|---------------------------------\\
const botadi = "Phoenix Network";

client.on("messageDelete", message => {
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`);
  const modlogkanal = message.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (message.content.length > 1024) {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          author: {
            name: `${message.author.tag} tarafından gönderilen bir mesaj silindi`,
            icon_url: message.author.displayAvatarURL({ dynamic: true })
          },
          fields: [
            {
              name: `Silinen mesaj 1024 karakterden fazla mesajı gösteremem`,
              value: `\`\`\`Bilinmiyor...\`\`\``
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL({ dynamic: true }),
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    } else {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          author: {
            name: `${message.author.tag} kullanıcısının mesajı silindi\n`,
            icon_url: message.author.displayAvatarURL({ dynamic: true })
          },
          fields: [
            {
              name: `Silinen mesaj:`,
              value: "```" + message.content + "```"
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: message.author.displayAvatarURL({ dynamic: true }),
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    }
  }
});

client.on("guildBanAdd", async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor(`#ee7600`)
      .setAuthor("Bir kişi sunucudan yasaklandı")
      .setThumbnail(
        user.avatarURL({ dynamic: true }) || user.defaultAvatarURL()
      )
      .addField(`Yasaklanan kişi`, `\`\`\` ${user.tag} \`\`\` `)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("guildBanRemove", async (guild, user) => {
  let modlogs = db.get(`modlogkanaly_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
      .setColor(`#ee7600`)
      .setAuthor("Bir kişinin yasağı kaldırıldı")
      .setThumbnail(
        user.avatarURL({ dynamic: true }) || user.defaultAvatarURL()
      )
      .addField(`Yasağı kaldırılan kişi`, `\`\`\` ${user.tag} \`\`\` `)
      .setFooter(`${botadi} | Mod-Log Sistemi`)
      .setTimestamp();
    modlogkanal.send(embed);
  }
});

client.on("channelCreate", async channel => {
  let modlogs = db.get(`modlogkanal_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          fields: [
            {
              name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
              value: `\`\`\` ${channel.name} \`\`\``
            },
            {
              name: `Oluşturulan Kanalin Türü`,
              value: `\`\`\` Metin Kanalı \`\`\``
            }
          ],
          timestamp: new Date(),
          footer: {
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    } else {
      if (channel.type === "voice") {
        modlogkanal.send({
          embed: {
            Color: "#080000",
            fields: [
              {
                name: `Bir Kanal Oluşturuldu. \nOluşturulan Kanalin İsmi:`,
                value: `\`\`\` ${channel.name} \`\`\``
              },
              {
                name: `Oluşturulan Kanalin Türü`,
                value: `\`\`\` Ses Kanalı \`\`\``
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `${botadi} | Mod-Log Sistemi`
            }
          }
        });
      }
    }
  }
});

client.on("channelDelete", async channel => {
  let modlogs = db.get(`modlogkanaly_${channel.guild.id}`);
  const modlogkanal = channel.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (channel.type === "text") {
      modlogkanal.send({
        embed: {
          Color: "#080000",
          fields: [
            {
              name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
              value: `\`\`\` ${channel.name} \`\`\``
            },
            {
              name: `Silinen Kanalin Türü`,
              value: `\`\`\` Ses Kanalı \`\`\``
            }
          ],
          timestamp: new Date(),
          footer: {
            text: `${botadi} | Mod-Log Sistemi`
          }
        }
      });
    } else {
      if (channel.type === "voice") {
        modlogkanal.send({
          embed: {
            Color: "#080000",
            fields: [
              {
                name: `Bir Kanal Silindi. \nSilinen Kanalin İsmi:`,
                value: `\`\`\` ${channel.name} \`\`\``
              },
              {
                name: `Silinen Kanalin Türü`,
                value: `\`\`\` Ses Kanalı \`\`\``
              }
            ],
            timestamp: new Date(),
            footer: {
              text: `${botadi} | Mod-Log Sistemi`
            }
          }
        });
      }
    }
  }
});

client.on("roleDelete", async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);
  const modlogkanal = role.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Bir Rol Silindi. \nSilinen Rolun İsmi:`,
            value: `\`\`\` ${role.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("emojiDelete", async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`);
  const modlogkanal = emoji.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Bir Emoji Silindi. \nSilinen Emojinin İsmi:`,
            value: `\`\`\` ${emoji.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("roleCreate", async role => {
  let modlogs = db.get(`modlogkanaly_${role.guild.id}`);
  const modlogkanal = role.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Yeni Bir Rol Oluşturuldu. \nOluşturulan Rolun İsmi:`,
            value: `\`\`\` ${role.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlogs = db.get(`modlogkanaly_${oldMessage.guild.id}`);
  const modlogkanal = oldMessage.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    if (oldMessage.author.bot) {
      return false;
    }

    if (!oldMessage.guild) {
      return false;
    }

    if (oldMessage.content == newMessage.content) {
      return false;
    }
    modlogkanal.send({
      embed: {
        Color: "#080000",
        author: {
          name: `${oldMessage.author.tag} mesajını düzenledi:\n`,
          icon_url: oldMessage.author.displayAvatarURL({ dynamic: true })
        },
        fields: [
          {
            name: `Eski mesaj:`,
            value: `\`\`\` ${oldMessage.content} \`\`\``
          },
          {
            name: `Yeni Mesaj:`,
            value: `\`\`\` ${newMessage.content} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: oldMessage.author.displayAvatarURL({ dynamic: true }),
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});

client.on("emojiCreate", async emoji => {
  let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`);
  const modlogkanal = emoji.guild.channels.cache.find(
    kanal => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    modlogkanal.send({
      embed: {
        Color: "#080000",
        fields: [
          {
            name: `Bir emoji eklendi. \nEklenen Emojinin İsmi:`,
            value: `\`\`\` ${emoji.name} \`\`\``
          }
        ],
        timestamp: new Date(),
        footer: {
          text: `${botadi} | Mod-Log Sistemi`
        }
      }
    });
  }
});
//---------------------------------|Mod-Log Sistemi Son|---------------------------------\\

//--------------------------------------------------------------------------------------\\Küfür Engel Baş

client.on("message", async msg => {
  
  
 const i = await db.fetch(`kufur_${msg.guild.id}`)
    if (i == "acik") {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda küfür filtresi etkin.`).setColor(`#ee7600`).setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  
 const i = db.fetch(`${oldMessage.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq","amguard","seksüel","sekssüel"];
        if (kufur.some(word => newMessage.content.includes(word))) {
          try {
            if (!oldMessage.member.hasPermission("BAN_MEMBERS")) {
                  oldMessage.delete();
                          
                      return oldMessage.channel.send(new Discord.MessageEmbed().setDescription(`${oldMessage.author} Bu sunucuda küfür filtresi etkin.`).setColor(`#ee7600`).setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});


//--------------------------------------------------------------------------------------\\Küfür Engel Son

//--------------------------------------------------------------------------------------\\Reklam Engel Baş

client.on("message", msg => {
 if(!db.has(`reklam_${msg.guild.id}`)) return;
        const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                    return msg.channel.send(new Discord.MessageEmbed().setDescription(`${msg.author} Bu sunucuda reklam filtresi etkin.`).setColor(`#ee7600`).setAuthor(msg.member.displayName, msg.author.avatarURL({ dynamic: true })).setTimestamp()).then(x => x.delete({timeout: 5000}));
  
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }
    });

//--------------------------------------------------------------------------------------\\Reklam Engel Son

//---------------------------------|Rol Koruma Sistemi Başlangıç|---------------------------------\\
         client.on("roleDelete", async(role , channel , message , guild) => {
          let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
            if (rolkoruma == "acik") {
          role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
                role.guild.owner.send(
                  new Discord.MessageEmbed()
                  .setDescription(`<a:olur:812342891774345266> **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum`))
        
          
        }
        }) 
//---------------------------------|Rol Koruma Sistemi Son|---------------------------------\\

//---------------------------------|Kanal Koruma Sistemi Başlangıç|---------------------------------\\
client.on("channelDelete", async function(channel) {
    let rol = await db.fetch(`kanalk_${channel.guild.id}`);
  
  if (rol) {
const guild = channel.guild.cache;
let channelp = channel.parentID;

  channel.clone().then(z => {
    let kanal = z.guild.channels.cache.find(c => c.name === z.name);
    kanal.setParent(
      kanal.guild.channels.find(channel => channel.id === channelp)
      
    );
  });
  }
})
//---------------------------------|Kanal Koruma Sistemi Son|---------------------------------\\

//---------------------------------|Bot Koruma Sistemi Başlangıç|---------------------------------\\
client.on("guildMemberAdd", async member => {
let kanal = await db.fetch(`antiraidK_${member.guild.id}`)== "bot-koruma aç"
  if (!kanal) return;  
  var cod = member.guild.owner
  if (member.user.bot === true) {
     if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
    let are = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL({dynamic: true}))
      .setDescription(`<a:olur:812342891774345266> **${member.user.tag}** (${member.id}) adlı bota bir yetkili verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır botun_id**.`);
    cod.send(are);
     } else {
       let izinverilmemişbot = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL({dynamic: true}))
      .setDescription("<a:olur:812342891774345266> **" + member.user.tag +"**" + " (" + member.id+ ") " + "adlı bot sunucuya eklendi ve banladım eğer izin vermek istiyorsanız **" + prefix + "bot-izni ver botun_id**")
       member.ban();
       cod.send(izinverilmemişbot)
}
  }
});
//---------------------------------|Bot Koruma Sistemi Son|--------------------------------

//Seviye Baş

client.on("message", async msg => {
  if (msg.content.startsWith()) return;

  const db = require("quick.db");

  var id = msg.author.id;

  var gid = msg.guild.id;

  var xp = await db.fetch(`xp_${id}_${gid}`);

  var lvl = await db.fetch(`lvl_${id}_${gid}`);

  let seviyexp = await db.fetch(`seviyexp${msg.guild.id}`);

  const skanal = await db.fetch(`seviyekanal${msg.guild.id}`);

  let kanal = msg.guild.channels.cache.get(skanal);

  if (msg.author.bot === true) return;

  let seviyeEmbed = new Discord.MessageEmbed();

  seviyeEmbed.setDescription(
    `<a:ZilGif:812738284983156768> Tebrik ederim <@${
      msg.author.id
    }>! Seviye atladın ve **${lvl + 1}** seviye oldun!`
  );

  seviyeEmbed.setFooter(`${client.user.username} | Seviye Sistemi`);

  seviyeEmbed.setColor(`#ee7600`);

  if (!lvl) {
    db.set(`xp_${id}_${gid}`, 5);

    db.set(`lvl_${id}_${gid}`, 1);

    db.set(`xpToLvl_${id}_${gid}`, 100);

    db.set(`top_${id}`, 1);
  }

  let veri1 = [];

  if (seviyexp) veri1 = seviyexp;

  if (!seviyexp) veri1 = 5;

  if (msg.content.length > 7) {
    db.add(`xp_${id}_${gid}`, veri1);
  }

  let seviyesınır = await db.fetch(`seviyesınır${msg.guild.id}`);

  let veri2 = [];

  if (seviyesınır) veri2 = seviyesınır;

  if (!seviyesınır) veri2 = 250;

  if ((await db.fetch(`xp_${id}_${gid}`)) > veri2) {
    if (skanal) {
      kanal.send(
        new Discord.MessageEmbed()

          .setDescription(
            `<a:ZilGif:812738284983156768> Tebrik ederim <@${
              msg.author.id
            }>! Seviye atladın ve **${lvl + 1}** seviye oldun!`
          )

          .setFooter(`${client.user.username} | Seviye Sistemi`)

          .setColor(`#ee7600`)
      );
    }

    db.add(`lvl_${id}_${gid}`, 1);

    db.delete(`xp_${id}_${gid}`);
  }

  db.set(`top_${id}`, Math.floor(lvl + 1));
});

//SEVİYE-ROL-----------------------------------

client.on("message", async message => {
  var id = message.author.id;

  var gid = message.guild.id;

  let rrol = await db.fetch(`rrol.${message.guild.id}`);

  var level = await db.fetch(`lvl_${id}_${gid}`);

  if (rrol) {
    rrol.forEach(async rols => {
      var rrol2 = await db.fetch(`rrol2.${message.guild.id}.${rols}`);

      if (Math.floor(rrol2) <= Math.floor(level)) {
        let author = message.guild.member(message.author);

        author.roles.add(rols);
      } else if (Math.floor(rrol2) >= Math.floor(level)) {
        let author = message.guild.member(message.author);

        author.roles.remove(rols);
      }
    });
  }

  if (message.content == "ph!rütbeler") {
    if (!rrol) {
      message.channel.send(
        new Discord.MessageEmbed()

          .setColor(`#ee7600`)

          .setFooter(
            `${client.user.username} Seviye-Rol Sistemi!`,
            client.user.avatarURL
          )

          .setDescription(`Herhangi bir rol oluşturulmadı.`)
      );

      return;
    }

    const { MessageEmbed } = require("discord.js");

    let d = rrol
      .map(
        x =>
          "<@&" +
          message.guild.roles.cache.get(x).id +
          ">" +
          " **" +
          db.get(`rrol3.${message.guild.id}.${x}`) +
          " Seviye**"
      )
      .join("\n");

    message.channel.send(
      new MessageEmbed()

        .setColor(`#ee7600`)

        .setFooter(
          `${client.user.username} Seviye-Rol Sistemi!`,
          client.user.avatarURL
        )

        .setDescription(`${d}`)
    );
  }
});

client.on("message", async message => {
  var id = message.author.id;

  var gid = message.guild.id;

  let srol = await db.fetch(`srol.${message.guild.id}`);

  var level = await db.fetch(`lvl_${id}_${gid}`);

  if (srol) {
    srol.forEach(async rols => {
      var srol2 = await db.fetch(`srol2.${message.guild.id}.${rols}`);

      if (Math.floor(srol2) <= Math.floor(level)) {
        let author = message.guild.member(message.author);

        author.roles.add(rols);
      } else if (Math.floor(srol2) >= Math.floor(level)) {
        let author = message.guild.member(message.author);

        author.roles.remove(rols);
      }
    });
  }

  if (
    message.content == "ph!seviyerolleri" ||
    message.content == "ph!levelroles"
  ) {
    if (!srol) {
      message.channel.send(
        new Discord.MessageEmbed()

          .setColor(`#ee7600`)

          .setFooter(
            `${client.user.username} Seviye-Rol Sistemi!`,
            client.user.avatarURL
          )

          .setDescription(`Herhangi bir rol oluşturulmadı.`)
      );

      return;
    }

    const { MessageEmbed } = require("discord.js");

    let d = srol
      .map(
        x =>
          "<@&" +
          message.guild.roles.cache.get(x).id +
          ">" +
          " **" +
          db.get(`srol3.${message.guild.id}.${x}`) +
          " Seviye**"
      )
      .join("\n");

    message.channel.send(
      new MessageEmbed()

       .setColor(`#ee7600`)

        //.setColor(message.guild.member(message.author).highestRole.hexColor)

        .setFooter(
          `${client.user.username} Seviye-Rol Sistemi!`,
          client.user.avatarURL
        )

        .setDescription(`${d}`)
    );
  }
});

//Seviye Son

//Ses Baş

let sessokma = process.env.ses;

client.on("ready", async () => {
  client.channels.cache.get(`${sessokma}`).join();
});

//Ses Son

//Sayaç Sistemi

client.on("guildMemberAdd", member => {
  const profil = JSON.parse(fs.readFileSync("./sayaç.json", "utf8"));
  if (!profil[member.guild.id]) return;
  if (profil[member.guild.id]) {
    let sayaçkanalID = profil[member.guild.id].kanal;
    let sayaçsayı = profil[member.guild.id].sayi;
    let sayaçkanal = client.channels.cache.get(sayaçkanalID);
    let aralık = parseInt(sayaçsayı) - parseInt(member.guild.members.cache.size);
    sayaçkanal.send(
      "🔹 `" +
        `${member.user.tag}` +
        "` Sunucuya Katıldı \n🔹 `" +
        sayaçsayı +
        "` Kişi Olmamıza `" +
        aralık +
        "` Kişi Kaldı! \n🔹 `" +
        member.guild.members.cache.size +
        "` Kişiyiz!"
    );
  } //CDS EKİBİ
});

client.on("guildMemberRemove", member => {
  const profil = JSON.parse(fs.readFileSync("./sayaç.json", "utf8"));
  if (!profil[member.guild.id]) return;
  if (profil[member.guild.id]) {
    let sayaçkanalID = profil[member.guild.id].kanal;
    let sayaçsayı = profil[member.guild.id].sayi;
    let sayaçkanal = client.channels.cache.get(sayaçkanalID);
    let aralık = parseInt(sayaçsayı) - parseInt(member.guild.members.cache.size);
    sayaçkanal.send(
      "🔸 `" +
        `${member.user.tag}` +
        "` Sunucudan Ayrıldı! \n🔸 `" +
        sayaçsayı +
        "` Kişi Olmamıza `" +
        aralık +
        "` Kişi Kaldı! \n🔸 `" +
        member.guild.members.cache.size +
        "` Kişiyiz!"
    );
  }
});

//Sayaç son

