const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader.js")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);






var prefix = ayarlar.prefix;

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
  if (message.author.id === ayarlar.sahip) permlvl = 4;
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

client.login(ayarlar.token);


//ROLE YETKİ VERİNCE ÇEKME

client.on("roleUpdate", async function(oldRole, newRole) {
  const bilgilendir = await newRole.guild
    .fetchAuditLogs({ type: "ROLE_UPLATE" })
    .then(hatırla => hatırla.entries.first());
  let yapanad = bilgilendir.executor;
  let idler = bilgilendir.executor.id;
  if (idler === "696033375668011078") return; // yapan kişinin id si bu ise bir şey yapma
  if (oldRole.hasPermission("ADMINISTRATOR")) return;

  setTimeout(() => {
    if (newRole.hasPermission("ADMINISTRATOR")) {
      newRole.setPermissions(newRole.permissions - 8);
    }

    if (newRole.hasPermission("ADMINISTRATOR")) {
      if (
        !client.guilds.get(newRole.guild.id).channels.has("734357755535687691")
      )
        return newRole.guild.owner.send(
          `Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi** Alındı. \Rol: **${newRole.name}**`
        ); //bu id ye sahip kanal yoksa sunucu sahibine yaz

      client.channels
        .get("734357755535687691")
        .send(
          `Rol Koruma Nedeniyle ${yapanad} Kullanıcısı Bir Role Yönetici Verdiği İçin Rolün **Yöneticisi Alındı**. \Rol: **${newRole.name}**`
        ); // belirtilen id ye sahip kanala yaz
    }
  }, 1000);
});

//ROL AÇINCA KORUMA NEDENİYLE SİLME
//client.on('roleCreate', async (role, member, message) => {
//let sChannel = role.guild.channels.find(c => c.name === 'a')

//sChannel.send(`**---------------------------------------------------------------------------
//Yeni Bir Rol Eklendi ve Koruma Nedeni ile silindi,
//Silinen Rol: ${role.name}
//---------------------------------------------------------------------------**
//`)
//    .then(() => console.log(`${role.name} adlı rol silindi`))
//   .catch(console.error);
//role.delete()
//});

//Sunucuya girdiğinde eklenecek rol

  //İNVİTE SİSTEMİ!
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});




//Davet-Takip SİSTEMİ!
client.on("guildMemberAdd", member => {
    member.guild.fetchInvites().then(guildInvites => {
      const ei = invites[member.guild.id];
      invites[member.guild.id] = guildInvites;
      const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
      const inviter = client.users.get(invite.inviter.id);
      const logChannel = member.guild.channels.find(
        channel => channel.id === "734357721008308224"
      );
      logChannel.send(
        `**__${member.user.tag}__** Sunucuya katıldı davet eden **__${inviter.tag} <a:okey:729866419126140968>__**  Bu daveti kullan kişi **${invite.uses} <a:nokta:730540544350093332>**`
      );
    });
  });

//SİLİNEN DÜZENLENEN MESAJ LOG!
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  let sChannelanan = newMessage.guild.channels.find(
    c => c.name === "message-log"
  );
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Mesaj Düzenlendi`, newMessage.author.avatarURL)
    .addField("Kullanıcı", newMessage.author)
    .addField("Eski Mesaj", oldMessage.content, true)
    .addField("Yeni Mesaj", newMessage.content, true)
    .addField("Kanal Adı", newMessage.channel.name, true)
    .addField("Mesaj ID", newMessage.id, true)
    .addField("Kullanıcı ID", newMessage.author.id, true)
    .setThumbnail(newMessage.author.avatarURL)
    .setFooter(
      `Bilgilendirme  • bügün saat ${newMessage.createdAt.getHours() +
        3}:${newMessage.createdAt.getMinutes()}`,
      `${client.user.displayAvatarURL}`
    );
  sChannelanan.send(embed);
});
client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  let sChannelanan = deletedMessage.guild.channels.find(
    c => c.name === "message-log"
  );
  let embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(`Mesaj Silindi`, deletedMessage.author.avatarURL)
    .addField("Kullanıcı", deletedMessage.author)
    .addField("Silinen Mesaj", deletedMessage.content, true)
    .addField("Kanal Adı", deletedMessage.channel.name, true)
    .addField("Mesaj ID", deletedMessage.id, true)
    .addField("Kullanıcı ID", deletedMessage.author.id, true)
    .setThumbnail(deletedMessage.author.avatarURL)
    .setFooter(
      `Bilgilendirme  • bügün saat ${deletedMessage.createdAt.getHours() +
        3}:${deletedMessage.createdAt.getMinutes()}`,
      `${client.user.displayAvatarURL}`
    );
  sChannelanan.send(embed);
});

client.on("message", msg => {
  //botun dm logu!
  var dm = client.channels.get("734357756844441640");
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("RANDOM")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField("Gönderen", msg.author.tag)
      .addField("Gönderen ID", msg.author.id)
      .addField("Gönderilen Mesaj", msg.content);

    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});
const botadibotkoruma = "NARKOTİK OWNER"; //sunucuya bot sokma engelleme!
client.on("guildMemberAdd", (member, msg) => {
  const message = member;
  db.fetch(`botkoruma_${message.guild.id}`).then(krma => {
    if (!krma) return false;
    if (krma) {
      if (krma === "systemm") {
        const guild = member.guild;
        let sChannel = member.guild.channels.find(c => c.name === "systemm"); //sunucunuzda bot-koruma kanalı açmanız lazım!

        if (member.user.bot !== true) {
        } else {
          sChannel
            .send(
              `**${botadibotkoruma} Bot Koruma Sistemi**
Sunucuya Bir Bot Eklendi Ve Güvenlik Nedeniyle Banlandı
Banlanan Bot: **${member.user.tag}**
@everyone  `
            )
            .then(() => console.log(`yasaklandı ${member.displayName}`))
            .catch(console.error);
          member.ban(member);
        }
      } else return false;
    } else return false;
  });
});
//ROL SİLİNCE YETKİSİNİ ÇEKME
client.on("roleDelete", async role => {
  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());
  const yetkili = await role.guild.members.get(entry.executor.id);
  const eskihali = role.permissions;
  console.log(eskihali);
  if (yetkili.id === "696033375668011078") return;
  let embed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription(
      `<@${yetkili.id}> isimli kişi ${role.id} ID'li rolü sildi ve sahip olduğu tüm rolleri alarak, kendisine \`CEZALI\` rolünü verdim.`
    )
    .setTimestamp();
  let roles = role.guild.members.get(yetkili.id).roles.array();
  try {
    role.guild.members.get(yetkili.id).removeRoles(roles);
  } catch (err) {
    console.log(err);
  }
  setTimeout(function() {
    role.guild.members.get(yetkili.id).addRole("734357621640790027");
    role.guild.owner.send(embed);
  }, 1500);
});
//KANAL SİLİNCE ESKİ AYARLARIYLA GERİ AÇMA!
client.on("channelDelete", async channel => {
  const logs = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  const deleter = await channel.guild.members.get(logs.executor.id);
  if (deleter.id == "696033375668011078") return; //bu satıra kendi id'nizi yazın sizin kanal silmenizi engellemeyecektir
  channel
    .clone(undefined, true, true, "Kanal silme koruması sistemi")
    .then(async klon => {
      await klon.setParent(channel.parent);
      await klon.setPosition(channel.position);
    });
});

//Etiket Spam Engel
const { RichEmbed } = require("discord.js");
client.on("message", async message => {
  if (!message.guild) return;
  if (message.member.hasPermission("MANAGE_GUILD")) return;
  if (message.mentions.users.size >= 3) {
    if (message.deletable) message.delete();
    message.channel.send(
      `Hey ${message.author}, sürekli birilerini etiketlemek kötüdür. `
    );
    message.author.send(
      `Hey ${message.author}, sürekli birilerini etiketlemek kötüdür. ${message.author} bir daha devam etme. ${message.author} ${message.author} ${message.author}`
    );
  }
});


//SİLİNEN KANALI ESKİ AYARIYLA GERİ AÇMA, SİLEN KİŞİSİNİN YETKİSİNİ ALMA!
client.on("channelDelete", async channel => {
  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());
  const yetkili = await channel.guild.members.get(entry.executor.id);
  if (yetkili.id === "696033375668011078") return;

  channel
    .clone(channel.name, true, true, "Silinen kanal geri açıldı")
    .then(clone =>
      console.log(
        ` ${channel.name} silinen kanal  ${clone.name} ismiyle yeniden açıldı.`
      )
    )
    .catch(console.error);

  let embed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(
      `<@${yetkili.id}> isimli kişi ${channel.id} ID'li kanalı sildi ve sahip olduğu tüm rolleri alarak, kendisine <@&734357621640790027>  rolünü verdim.`
    )
    .setTimestamp();
  let roles = channel.guild.members.get(yetkili.id).roles.array();
  try {
    channel.guild.members.get(yetkili.id).removeRoles(roles);
  } catch (err) {
    console.log(err);
  }
  setTimeout(function() {
    channel.guild.members.get(yetkili.id).addRole("734357621640790027");
    channel.guild.owner.send(embed);
  }, 1500);
});

client.on("roleDelete", async role => {
  let mention = role.mentionable; //Silinen rolü yeniden açma (eski ayarlarıyla)
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  });
});


//SAĞ TIK KİCK, SAĞ TIK BAN KORUMA

const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
let banse = new Set();
let bane = JSON.parse(fs.readFileSync("./data1.json", "utf8")); //require data1.json
client.on("guildMemberRemove", async u => {
  const ard = db.fetch(`antiraid_${u.guild.id}`);
  if (!ard) return;
  /* if(!antihack[u.guild.id]) antihack[u.guild.id] = {
        onoff: 'Off'
      }*/
  u.guild.fetchAuditLogs().then(s => {
    var ss = s.entries.first();
    if (ss.executor.id === "734357621640790027") return; /// RED
    if (ss.action == "MEMBER_BAN_ADD") {
      if (!data[ss.executor.id]) {
        data[ss.executor.id] = {
          time: 1
        };
        //  if(antihack[message.guild.id].onoff === 'Off') return;
        //if(antihack[u.guild.id].onoff === 'Off') return;
      } else {
        data[ss.executor.id].time += 1;
      }
      // if(antihack[u.guild.id].onoff === 'Off') return;
      //  if(antihack[message.guild.id].onoff === 'Off') return;
      data[ss.executor.id].time = 0;
      u.guild.members.get(ss.executor.id).roles.forEach(r => {
        u.guild.members.get(ss.executor.id).removeRole(r);
        setTimeout(function() {
          u.guild.members.get(ss.executor.id).addRole("734357621640790027");
          /* var regex = /([a-zA-ZğüşöçİĞÜŞıIÖÇ ]+)/g; 
	  var nick = member.user.username.match(regex);
	 member.setNickname(tag+" "+nick)*/
        }, 5000);
        /*r.edit({
                     permissions : []
                 });*/
        data[ss.executor.id].time = 0;
      });
      setTimeout(function() {
        if (data[ss.executor.id].time <= 3) {
          data[ss.executor.id].time = 0;
        }
      });
    }
  });
  fs.writeFile("./data.json", JSON.stringify(data), err => {
    if (err) console.log(err.message);
  });
});
client.on("guildMemberRemove", u => {
  const ard = db.fetch(`antiraid_${u.guild.id}`);
  if (!ard) return;
  /* if(!antihack[u.guild.id]) antihack[u.guild.id] = {
        onoff: 'Off'
      }*/
  u.guild.fetchAuditLogs().then(s => {
    var ss = s.entries.first();
    if (ss.executor.id === "734357621640790027") return; /// RED
    if (ss.action == `MEMBER_KICK`) {
      if (!data[ss.executor.id]) {
        data[ss.executor.id] = {
          time: 1
        };
        //  if(antihack[message.guild.id].onoff === 'Off') return;
        //if(antihack[u.guild.id].onoff === 'Off') return;
      } else {
        data[ss.executor.id].time += 1;
      }
      // if(antihack[u.guild.id].onoff === 'Off') return;
      //  if(antihack[message.guild.id].onoff === 'Off') return;
      data[ss.executor.id].time = 0;
      u.guild.members.get(ss.executor.id).roles.forEach(r => {
        u.guild.members.get(ss.executor.id).removeRole(r);
        setTimeout(function() {
          u.guild.members.get(ss.executor.id).addRole("734357621640790027");
          /* var regex = /([a-zA-ZğüşöçİĞÜŞıIÖÇ ]+)/g; 
	  var nick = member.user.username.match(regex);
	 member.setNickname(tag+" "+nick)*/
        }, 5000);
        /*r.edit({
                     permissions : []
                 });*/
        data[ss.executor.id].time = 0;
      });
      setTimeout(function() {
        if (data[ss.executor.id].time <= 3) {
          data[ss.executor.id].time = 0;
        }
      });
    }
  });
  fs.writeFile("./data.json", JSON.stringify(data), err => {
    if (err) console.log(err.message);
  });
});

//BOT ENGEL
client.on("guildMemberAdd", async member => {
  if (member.user.bot) {
    member.guild.roles.forEach(async function(yetkilirol) {
      if (yetkilirol.id === "696033375668011078") return;
      if (yetkilirol.hasPermission("ADMINISTRATOR")) {
        yetkilirol.setPermissions(yetkilirol.permissions - 8);
      }
    });
    let korumakanalı = client.channels.get("734953597120413696");

    if (!korumakanalı || korumakanalı === null) {
      member.ban(member);
      member.guild.owner.send(
        `botkoruma-odası olmadığı içim sunucu sahibinin DM'sine yazıyorum.| **Sunucuya bir bot eklendi ve koruma nedeniyle botu banladım. \nBanlanan Bot: **${member}  `
      );
    } else {
      member.ban(member);
      korumakanalı.send(
        `**Sunucuya bir bot eklendi ve red koruma nedeniyle botu banladım.  \nBanlanan Bot: **${member}`
      );
    }
  } else {
  }
});

//3 GÜNDEN ÖNCE AÇILAN HESAPLARI ŞÜPHELİ PERMİ VERME
client.on("guildMemberAdd", member => {
  var moment = require("moment");
  require("moment-duration-format");
  moment.locale("tr");
  var { Permissions } = require("discord.js");
  var x = moment(member.user.createdAt)
    .add(20, "days")
    .fromNow();
  var user = member.user;
  x = x.replace("birkaç saniye önce", " ");
  if (!x.includes("önce") || x.includes("sonra") || x == " ") {
    var rol = member.guild.roles.get("734357621640790027");
    var kayıtsız = member.guild.roles.get("734357659855355965");
    member.addRole(rol);
    setTimeout(() => {
      member.removeRole(kayıtsız.id);
    }, 1000);
  } else {
  }
});


