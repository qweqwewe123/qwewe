const Discord = require("discord.js")
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);
const ayarlar = require('./ayarlar.json')

const db = require("quick.db")
 client.on('guildMemberAdd', async (member, guild, message) => {

     let kayıtsız = await db.fetch(`kayıtsızRol.${member.guild.id}`)
     if (!kayıtsız || kayıtsız.toLowerCase() === 'yok') return;
    else {
     try {
            member.addRole(member.guild.roles.get(kayıtsız))
                          } catch (e) {
     console.log(e)
    }
    }
    
    });

///GİRİŞ///
client.on('guildMemberAdd', async (member, guild, message) => {
  var randomMsg = ["az önce kayarak sunucuya girdi!",
   "Pizza getirmişsindir umarım!",
   "Geldi ve bütün dertler bitti..",
   "Geldi ve bize rest çekti..",
   "Herkes seni bekliyordu!",
   "Kanka son maceran nasıldı?",
   "Geldiğine göre artık sohbet edebiliriz. ^^"     
];
var randomMsg_integer = randomMsg[Math.floor((Math.random() * randomMsg.length))]
let user = client.users.get(member.id);
require("moment-duration-format");

const kurulus = new Date().getTime() - user.createdAt.getTime();
const gün = moment.duration(kurulus).format("D")   
var kontrol;
if (kurulus < 604800000) kontrol = 'Şüpheli!'
if (kurulus > 604800000) kontrol = 'Güvenilir!'

moment.locale('tr-TR');
   let yetkili = await db.fetch(`kayıtYetkili.${member.guild.id}`)
   let kanal = await db.fetch(`kayıtKanal.${member.guild.id}`)
   if (!yetkili || yetkili.toLowerCase() === 'yok') return;
  else {
   try {
    
    if (!kanal) return 
    let kanale = member.guild.channels.get(kanal.id)

    kanal.send(`<@${member.user.id}> **${randomMsg_integer}** \nSeninle birlikte \`${member.guild.memberCount}\` kişiyiz! \nKayıt için **isimini** ve **yaşını** yazıp, **ses** teyiti vermen yeterlidir! \n<@&${yetkili}> Ekibimiz sizinle ilgilenecektir! \nHesap Durumu **${moment.utc(member.createdAt).format('LLLL')} - ${kontrol}** `)
//let random = gifs[Math.floor(Math.random() * gifs.length)]
//kanal.send(new Discord.Attachment(gifs[random], "resim.gif"))
//channel.sendFiles(['./uyari.gif', './file-two.png']);
   } catch (e) {
   console.log(e)
  }
  }
  
  });


/*
!!
EMİRHAN SARAÇ TARAFINDAN YAPILIP PAYLAŞILMIŞTIR!
YOUTUBE: EMİRHAN SARAÇ
!!
*/


/*
!!
EMİRHAN SARAÇ TARAFINDAN YAPILIP PAYLAŞILMIŞTIR!
YOUTUBE: EMİRHAN SARAÇ
!!
*/



const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};


/*
!!
EMİRHAN SARAÇ TARAFINDAN YAPILIP PAYLAŞILMIŞTIR!
!!
*/


client.login(ayarlar.token)
