const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");

var prefix = process.env.prefix;

var phoenix = process.env.ready;

module.exports = client => {
  console.log(
    ` [${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}] BOT: Aktif, Komutlar yüklendi!`
  );
  console.log(
    ` [${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${
      client.user.username
    } ismi ile giriş yapıldı!`
  );
  client.user.setStatus("idle");

  client.user.setActivity(`${phoenix}`, { type: "WATCHING" });

  console.log(
    ` [${moment().format("YYYY-MM-DD HH:mm:ss")}] Oyun ismi ayarlandı!`
  );
};
