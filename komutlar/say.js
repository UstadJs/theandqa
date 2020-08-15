const Discord = require("discord.js");
const { oneLine, stripIndents } = require('common-tags');
module.exports.run = async (client, message, args) => {
  
   let guild = "455903722485317635";//SUNUCU İD KOY AMK APTALI SENİ
    const voiceChannels = message.guild.channels.filter(c => c.type === 'voice');
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  var msg = message;
  var üyesayısı = msg.guild.members.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
'0': `<a:0_:742404212939554874>`,
    '1': `<a:1_:742404210338824284>`,
    '2': `<a:2_:742404212738228225>`,
    '3': `<a:3_:742404212528513086>`,
    '4': `<a:4_:742404212687765654>`,                       
    '5': `<a:5_:742404212129923072>`,
    '6': `<a:6_:742404213166047373>`,
    '7': `<a:7_:742404211798573157>`,
    '8': `<a:8_:742404213920759881>`,
    '9': `<a:9_:742404212956069990>`}[d];
      })
    }/////////////////////////////
  var sessayı = count.toString().replace(/ /g, "    ")
  var üs2 = sessayı.match(/([0-9])/g)
  sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs2) {
    sessayı = sessayı.replace(/([0-9])/g, d => {
      return {
'0': `<a:0_:742404212939554874>`,
    '1': `<a:1_:742404210338824284>`,
    '2': `<a:2_:742404212738228225>`,
    '3': `<a:3_:742404212528513086>`,
    '4': `<a:4_:742404212687765654>`,                       
    '5': `<a:5_:742404212129923072>`,
    '6': `<a:6_:742404213166047373>`,
    '7': `<a:7_:742404211798573157>`,
    '8': `<a:8_:742404213920759881>`,
    '9': `<a:9_:742404212956069990>`}[d];
      })
    }/////////////////////////////
    var bostbasansayi = message.guild.roles.get('730472682625171577').members.size.toString().replace(/ /g, "    ")
  var üs2 = bostbasansayi.match(/([0-9])/g)
  bostbasansayi = bostbasansayi.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs2) {
    bostbasansayi = bostbasansayi.replace(/([0-9])/g, d => {
      return {
'0': `<a:0_:742404212939554874>`,
    '1': `<a:1_:742404210338824284>`,
    '2': `<a:2_:742404212738228225>`,
    '3': `<a:3_:742404212528513086>`,
    '4': `<a:4_:742404212687765654>`,                       
    '5': `<a:5_:742404212129923072>`,
    '6': `<a:6_:742404213166047373>`,
    '7': `<a:7_:742404211798573157>`,
    '8': `<a:8_:742404213920759881>`,
    '9': `<a:9_:742404212956069990>`}[d];
      })
    }/////////////////////////////
var tagdakiler = 0;
let tag = "' Nᴀʀᴋᴏᴛɪᴋ";
 
  message.guild.members.forEach(member => {
    if(member.user.username.includes(tag)) {
      tagdakiler = tagdakiler+1
    }  
  })
  var tagdakilerr = tagdakiler.toString().replace(/ /g, "    ")
  var üs3 = tagdakilerr.match(/([0-9])/g)
  tagdakilerr = tagdakilerr.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs3) {
    tagdakilerr = tagdakilerr.replace(/([0-9])/g, d => {
      return {
'0': `<a:0_:742404212939554874>`,
    '1': `<a:1_:742404210338824284>`,
    '2': `<a:2_:742404212738228225>`,
    '3': `<a:3_:742404212528513086>`,
    '4': `<a:4_:742404212687765654>`,                       
    '5': `<a:5_:742404212129923072>`,
    '6': `<a:6_:742404213166047373>`,
    '7': `<a:7_:742404211798573157>`,
    '8': `<a:8_:742404213920759881>`,
    '9': `<a:9_:742404212956069990>`}[d];
      })
    }/////////////////////////////

  var onlayn = message.guild.members.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
  var üs4= onlayn.match(/([0-9])/g)
  onlayn = onlayn.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs4) {
    onlayn = onlayn.replace(/([0-9])/g, d => {
      return {
'0': `<a:0_:742404212939554874>`,
    '1': `<a:1_:742404210338824284>`,
    '2': `<a:2_:742404212738228225>`,
    '3': `<a:3_:742404212528513086>`,
    '4': `<a:4_:742404212687765654>`,                       
    '5': `<a:5_:742404212129923072>`,
    '6': `<a:6_:742404213166047373>`,
    '7': `<a:7_:742404211798573157>`,
    '8': `<a:8_:742404213920759881>`,
    '9': `<a:9_:742404212956069990>`}[d];
      })
    }/////////////////////////////
  
let emoji1 = `<a:688145976287953085:742404394322100345>`;
 const embed1 = new Discord.RichEmbed()
 .setColor('BLACK')
 .setAuthor('ꄶ Ƭнє King Oғ Nᴀʀкoтiк')
 .setDescription(`${emoji1} **Sunucumuzda Toplam ** ${üyesayısı} **Üye bulunmakta.** \n\n ${emoji1} **Sunucumuzda Toplam** ${onlayn} **Çevrimiçi üye bulunmakta.** \n\n ${emoji1} **Ses kanallarında Toplam** ${sessayı} **Üye bulunmakta.** \n\n ${emoji1} **Tagımızda Toplam ** ${tagdakilerr} **Kişi bulunmakta.** \n\n ${emoji1} **Boost Basan Toplam ** ${bostbasansayi} **Kişi bulunmakta.**`)
 .setFooter(`Komutu Kullanan Yetkili: ${message.author.username}`)
 
     const hata = new Discord.RichEmbed()
    .setColor('BLACK')
    .setAuthor(`Hata`)
    .setDescription(`**Bu komutu kullanmaya hakkınız yoktur!**`)
 
  msg.channel.send(embed1);
  
  /*client.setInterval(() => {
  let channel = client.channels.get("694870726280347668"); 
  channel.setTopic(`Toplam üye: _${üyesayısı.toString()}_ / Çevrimiçi üye: ${onlayn}`); //kanal açıklama oto
}, 10000);*/
  }
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["total",'toplam','says','info'],
  permLevel: 0
};
exports.help = {
  name: 'say'
}