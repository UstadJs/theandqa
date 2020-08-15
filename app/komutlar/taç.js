const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (bot, message, args) => {
   message.delete();
    const embed = new Discord.RichEmbed()
    .setColor('RED')
    .setDescription(`Sunucunun tacı şuanda <@${message.guild.owner.id}> kişisinde.`)
    .setFooter(`Komutu kullanan: ${message.author.tag}`);
    return message.channel.send(embed).then(msg => {
    msg.delete(30000)
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'taç',
  description: '',
  usage: ''
};;