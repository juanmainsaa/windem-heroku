const Canvas = require('canvas');
const Discord = require('discord.js');
const config = require(`${process.cwd()}/config/config.json`);
const { MessageEmbed } = require('discord.js');
const setupSchema = require(`${process.cwd()}/modelos/setups.js`);
module.exports = client => {
    console.log("CARGADO EL MÓDULO DE BIENVENIDAS")
    client.on("guildMemberAdd", async member => {
        try {
            let data = await setupSchema.findOne({ guildID: member.guild.id });
            if (!data || !data.bienvenida || !member.guild.channels.cache.get(data.bienvenida.canal)) return;
            let bienvenida = await generar_bienvenida(member, data);
        } catch (e) { console.log(e) }
    })
}

async function generar_bienvenida(member, data) {
    try {
        const canvas = Canvas.createCanvas(1772, 633);
      //make it "2D"
      const ctx = canvas.getContext('2d');
      //set the Background to the welcome.png
      const background = await Canvas.loadImage(`./welcome.png`);
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#f2f2f2';
      ctx.strokeRect(0, 0, canvas.width, canvas.height);
      //set the first text string 
      var textString3 = `${member.user.username}`;
      //if the text is too big then smaller the text
      if (textString3.length >= 14) {
        ctx.font = 'bold 100px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //else dont do it
      else {
        ctx.font = 'bold 150px Genta';
        ctx.fillStyle = '#f2f2f2';
        ctx.fillText(textString3, 720, canvas.height / 2 + 20);
      }
      //define the Discriminator Tag
      var textString2 = `#${member.user.discriminator}`;
      ctx.font = 'bold 40px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString2, 730, canvas.height / 2 + 58);
      //define the Member count
      var textString4 = `Miembro #${member.guild.memberCount}`;
      ctx.font = 'bold 60px Genta';
      ctx.fillStyle = '#f2f2f2';
      ctx.fillText(textString4, 750, canvas.height / 2 + 125);
      //get the Guild Name
      //var textString4 = `💀 WINDEM 💀`;
      //ctx.font = 'bold 60px Genta';
      //ctx.fillStyle = '#f2f2f2';
     // ctx.fillText(textString4, 700, canvas.height / 2 - 150);
      //create a circular "mask"
      ctx.beginPath();
      ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);//position of img
      ctx.closePath();
      ctx.clip();
      //define the user avatar
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
      //draw the avatar
      ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
        //get it as a discord attachment
      const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
        const WelcomeEmbed = new MessageEmbed()
        .setColor('#b362ef')
        .setTitle('Bienvenid@ a 💀 WINDEM 💀')
        .setURL('https://discord.gg/sqAYjusc')
        .setDescription(`Hola <@${member.id}>! 
        Bienvenid@ a tu nuevo hogar!`)
        .setThumbnail(member.guild.iconURL())
     //   .addFields(
     //       { name: 'Regular field title', value: 'Some value here' },
     //       { name: '\u200B', value: '\u200B' },
     //       { name: 'Inline field title', value: 'Some value here', inline: true },
     //       { name: 'Inline field title', value: 'Some value here', inline: true },
    //    )
     //   .addField('Inline field title', 'Some value here', true)
        .setImage('attachment://welcome-image.png')
        .setTimestamp()
        .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL(), url: 'https://discord.gg/sqAYjusc' });
        const channel = member.guild.channels.cache.find(ch => ch.id === config.CHANNEL_WELCOME);
        channel.send({ embeds: [WelcomeEmbed], files: [attachment]});
        member.roles.add("912658039746752522");
    } catch (e) { console.log(e) }
}
