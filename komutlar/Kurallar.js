const Discord = require("discord.js");

let kurallar = process.env.kurallar;

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor(`#ee7600`)
        .setDescription(
          "<a:olmaz:812330351333736460> Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmanız gerek."
        )
    );
  let user = message.mentions.users.first() || message.author;

  const exampleEmbed = new Discord.MessageEmbed()
    .setColor(`#ee7600`)
    .setTitle(`${kurallar}`)
    .setDescription(
      `:clipboard: **__Kurallar__** :clipboard:

➤ Küfür, sansür, argo (lan ve ulan), hakaret, kışkırtıcı sözler, uygun olmayan emoji kullanımı (tepki olarak ekleme de dahil), uygunsuz davranışlar ve her türlü nefret söylemi yasaktır.
➤ Cinsellik, siyaset ve dini konular yasaktır.
➤ Büyük harfle yazmak (sınırı beştir), harf, karakter ve emoji uzatmak (sınırı beştir), şekilli yazı stilleri kullanmak, spam yapmak (aynı mesajı ard arda dört kere yazmak), flood yapmak (farklı mesajı ard arda dört kere yazmak), uzun yazı paylaşımı ve chati kirletecek her türlü yazı yasaktır.
➤ Ticaret yasaktır (Alış, satış, istemek veya vermek).
➤ Özel bilgi paylaşımı yasaktır.
➤ İçinde küfürlü sözler içeren ve 10 dakikadan uzun şarkıları açmak yasaktır.
➤ Sesli odalarda rahatsız edici eylem yasaktır. (Mikrofona üflemek, odaya sürekli gir çık yapmak vb.)
➤ Aşk & sevgili muhabbetleri yasaktır.
➤ Chatleri ve sesli odaları amaçları dışında kullanmak yasaktır.
➤ Durum kısımında ve oynuyor kısmında reklam, ticaret, küfür ve uygunsuz söylemler yasaktır.
➤ Uygunsuz profil resimi ve nick kullanmak yasaktır.
➤ Spoiler vermek yasaktır.
➤ Fotoğraf Sohbete +18 fotoğraf küfür ve zararlı madde içeren fotoğraflar atmak yasaktır.
➤ Üyeleri ve yetkilileri kandırmak yasaktır.
➤ Müzik Chate müzik linki atmak dışında her türlü link paylaşımı yasaktır. (Youtuber Dostlar, Dostlar ve Yetkililer hariç)
➤ Reklam yapmak yasaktır. (Dm kısmı da dahildir.) 
➤ Yetkili başvuruları hakkında herhangi bir yetkiliye sormak yasaktır ve otomatik reddedilme sebebidir.
➤ Troll yasaktır.
➤ Yan hesap kullanımı yasaktır.
➤ Üyelere karşı rahatsız edici eylemlerde bulunmak yasaktır.
➤ İşlem (susturma, ban, kick) yapılan kişiler hakkında soru sormak yahut konuşmak yasaktır.
➤ Sunucu kopyalamak, aktif üye çekmek ve Minecraft Evi adını kullanarak prim kasmak yasaktır.
➤ Tartışma/kavga çıkartmak yasaktır.
➤ Yetkililere özel komutları kullanmak yasaktır.
              Sunucuya katılan herkes bu kuralları okumuş ve kabul etmiş sayılır. Mazeret kabul edilmez.`
    )
    .setThumbnail(
      "https://media.discordapp.net/attachments/812305035874402359/812318573485752380/a_43c0e0c5014196206b8d7ffca24145d8.gif"
    );
  message.channel.send(exampleEmbed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "kurallar",
  description: "kuralları atar",
  usage: "kurallar"
};
