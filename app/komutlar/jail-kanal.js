const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**İŞTE BU!** <a:siyahtik:730540565304967179>', '**SÜPER!** <a:siyahtik:730540565304967179>', '**NASIL YAPTIN BUNU?!** <a:siyahtik:730540565304967179>', '**MÜKEMMEL!** <a:siyahtik:730540565304967179>', '**SEVDİM BUNU!** <a:siyahtik:730540565304967179>', '**ŞİMDİ OLDU!** <a:siyahtik:730540565304967179>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <a:uyar:729745793258356797>', '**OLMADI BU!** <a:uyar:729745793258356797>', '**HAY AKSİ!** <a:uyar:729745793258356797>', '**HADİ ORADAN!** <a:uyar:729745793258356797>', '**OLMADI YA!** <a:uyar:729745793258356797>', '**BÖYLE OLMAZ?!** <a:uyar:729745793258356797>', '**HADİ YA!** <:basarisiz:690022419116851268>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`**${ayarlar.prefix}jail-yetkilisi ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, !jail-yetkilisi ayarla/sıfırla @rol yazmalısın.\nDetaylı bilgi için: !yardım sustur-kanal`)
   
  
  if (args[0] == 'ayarla') {
  
  let kanal = message.mentions.channels.first() || message.guild.channels.find(c => c.name === args[1].join('-'))
  if (!kanal) return message.channel.send(x2 + ` Bir kanal etiketle.`)
  
  db.set(`jailkanal_${message.guild.id}`, kanal.id)
  message.channel.send(x + ` Jail logunun tutulacağı kanal ${kanal} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailkanal_${message.guild.id}`)
    message.channel.send(x + ` Jail logunun tutulduğu kanal başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailkanal'],
 permLevel: 0
};

exports.help = {
 name: 'jail-kanal',
 description: 'Birisi jaile atılınca hangi kanala mesaj atılacağını ayarlarsınız.',
 usage: 'jail-kanal ayarla/sıfırla #kanal',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};