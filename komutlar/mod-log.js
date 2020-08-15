const Discord = require('discord.js')
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`);
  
  let mlog = message.mentions.channels.first()
  let sıfırla = db.fetch(`mlog_${message.guild.id}`)

if(args[0] === "sıfırla") {
    if(!sıfırla) {
      message.channel.send(new Discord.RichEmbed()
      .setDescription(`<a:uyar:729745793258356797> | Mod Log Kanalı zaten ayarlı değil.`)
      .setColor("BLACK"))                     
      return
    }
    
    db.delete(`mlog_${message.guild.id}`)
    message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:okey:729866419126140968> | Mod Log Kanalı başarıyla sıfırlandı.`)
      .setColor("BLACK"))                   
    return
  }


  
  if (!mlog) {
    return message.channel.send(new Discord.RichEmbed()
     .setDescription(`<a:uyar:729745793258356797> | Mod Log Kanalı etiketlemelisin.`)
    .setColor("BLACK"))                          
  }
  
  
  
  
  db.set(`mlog_${message.guild.id}`, mlog.id)
  
   // message.channel.send(`Otorol \`${rol.name}\`, otorol kanalı ${rolk} olarak ayarlandı.`)
  
  const embed = new Discord.RichEmbed()
        .setDescription(`<a:okey:729866419126140968> Mod Log Kanalı başarıyla ${mlog} olarak ayarlandı.\nKanalı sıfırlamak için **!modlog sıfırla** yazabilirsiniz!`)
        .setColor("BLACK")
        .setTimestamp()
    message.channel.send({embed})
  
  };
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['mod-log', 'modlog', 'setmodlog'],
    permLevel: 0
}

exports.help = {
    name: 'mod-log-ayarla',
    description: 'Mod Logu ayarlar.',
    usage: 'mod-log-ayarla'
}