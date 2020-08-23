const Discord = require('discord.js');
const db = require('quick.db')
const ms = require("ms");


exports.run = async(client, message, args) => {
              const ayarlar = require('../ayarlar.json')
				    let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix

  let mutel = await db.fetch(`kadınRol.${message.guild.id}`);
  let yetkili = await db.fetch(`yetkiliRol.${message.guild.id}`);
  let kayitsiz = await db.fetch(`kayıtsızRol.${message.guild.id}`);
/*
!!
EMİRHAN SARAÇ TARAFINDAN YAPILIP PAYLAŞILMIŞTIR!
!!
*/

  if (!yetkili) return
  if (!mutel) return
  if(!message.member.roles.has(yetkili)) {
      const hata = new Discord.RichEmbed()
      .setAuthor('HATA', message.author.avatarURL)
      .setDescription(`Bu komut için yetersiz izniniz bulunuyor! Yetkili rolüne sahip olmalısınız!`) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        }
    let kisi = message.mentions.members.first()
        if(!kisi) {
          const hata = new Discord.RichEmbed()
          .setAuthor('HATA', message.author.avatarURL)
          .setDescription(`Lütfen bir kullanıcıyı etiketleyin!\n\n**Örnek Kullanım:** \n\`\`\`${prefix}kadın @kullanıcı\`\`\` `) 
          .setColor('RED')
          .setTimestamp()
          return message.channel.send(hata)
            }
/*
!!
EMİRHAN SARAÇ TARAFINDAN YAPILIP PAYLAŞILMIŞTIR!
!!
*/

    if (kisi.id === message.author.id) { 
      const hata = new Discord.RichEmbed()
      .setAuthor('HATA', message.author.avatarURL)
      .setDescription(`Kendinizi kayıt edemezsiniz!`) 
      .setColor('RED')
      .setTimestamp()
      return message.channel.send(hata)
        }
  if (!kisi.voiceChannel || kisi.voiceChannel.id === null || kisi.voiceChannel.id === NaN || kisi.voiceChannel.id === undefined) 
return message.reply(`Etiketlediğin Kullanıcı Ses Kanalına Bağlı Değil.`).catch(console.error)

        const embed22 = new Discord.RichEmbed()
        .setTitle(`Sen Harikasın!`)
  .setDescription(`**Kayıt Edilen Kullanıcı** ${kisi}  \n**Kayıt İşleminde Verilen Rol** <@&${mutel}>`)
  .setFooter(`Komutu kullanan yetkili : ${message.author.username}`, message.author.avatarURL)  
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("GREEN")
  .setThumbnail(message.author.avatarURL)
  message.channel.send(embed22)
  
    kisi.addRole(mutel).then(y => y.removeRole(kayitsiz))

/*
!!
EMİRHAN SARAÇ TARAFINDAN YAPILIP PAYLAŞILMIŞTIR!
!!
*/

    const yar = new Discord.RichEmbed()
    .setTitle(`Sunucu Kayıt Log`)
.setDescription(`
**Kayıt Edilen Kullanıcı:** ${kisi}
**Kullanıcıyı Kayıt Eden Kullanıcı**:  <@!${message.author.id}>
`)
.setColor("#F1F10D")
.setTimestamp()
.setThumbnail(client.user.avatarURL)
client.channels.get(modlog).send(yar)
  db.set(`muteee.${kisi.id}`, 'var')     
  db.add(`kadınpuan_${message.guild.id}_${message.author.id}`, 1);

};

/*
!!
EMİRHAN SARAÇ TARAFINDAN YAPILIP PAYLAŞILMIŞTIR!
!!
*/


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kadın'],
  permLevel: 0
};

exports.help = {
  name: 'teyit-kadın',
  description: 'Erkek rolü verirsiniz.',
  usage: 'erkek',
};