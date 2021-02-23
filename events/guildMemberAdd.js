const fs = require("fs");
const Discord = require("discord.js");
const db = require("quick.db");
const chalk = require("chalk");
module.exports = async member => {
  if (db.has(`sayı${member.guild.id}`) === true) {
    if (db.has(`mkanal${member.guild.id}`) === true) {
      const channel = db.fetch(`mkanal${member.guild.id}`);
    }
  }
};
