const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async(client, message, args) => {
  
   var başarılı = ['**İŞTE BU!** <a:siyahtik:730540565304967179>', '**SÜPER!** <a:siyahtik:730540565304967179>', '**NASIL YAPTIN BUNU?!** <a:siyahtik:730540565304967179>', '**MÜKEMMEL!** <a:siyahtik:730540565304967179>', '**SEVDİM BUNU!** <a:siyahtik:730540565304967179>', '**ŞİMDİ OLDU!** <a:siyahtik:730540565304967179>'];
   var x = başarılı[Math.floor(Math.random() * başarılı.length)];

   var başarısız = ['**TÜH!** <a:uyar:729745793258356797>', '**OLMADI BU!** <a:uyar:729745793258356797>', '**HAY AKSİ!** <a:uyar:729745793258356797>', '**HADİ ORADAN!** <a:uyar:729745793258356797>', '**OLMADI YA!** <a:uyar:729745793258356797>', '**BÖYLE OLMAZ?!** <a:uyar:729745793258356797>', '**HADİ YA!** <a:uyar:729745793258356797>'];
   var x2 = başarısız[Math.floor(Math.random() * başarısız.length)];
  
if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`**${ayarlar.prefix}jail-rol ayarla/sıfırla** isimli komutu kullanabilmek için \`SUNUCUYU YÖNET\` yetkisine sahip olman gerekiyor.`)
if (!args[0]) return message.reply(`Sistemi kullanabilmek için, !!jail-rol ayarla/sıfırla @rol yazmalısın.\n`)
   
  
  if (args[0] == 'ayarla') {
  
  let rol = message.mentions.roles.first() || message.guild.roles.find(c => c.name === args[1].join(' '))
  if (!rol) return message.channel.send(x2 + ` Bir rol etiketle.`)
  
  db.set(`jailrol_${message.guild.id}`, rol.id)
  message.channel.send(x + ` Jail rolü ${rol} olarak ayarlandı.`)
  } 
  

  if (args[0] == 'sıfırla') {
    db.delete(`jailrol_${message.guild.id}`)
    message.channel.send(x + ` Jail rolü başarıyla sıfırlandı.`)
  }
  
  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['jailrol'],
 permLevel: 0
};

exports.help = {
 name: 'jail-rol',
 description: 'Birisi jaile atılınca hangi role sahip olacağını ayarlarsınız.',
 usage: 'jail-rol ayarla/sıfırla @rol',
 kategori: '**MODERASYON**',
 permLvl: '**SUNUCUYU YÖNET**'
};