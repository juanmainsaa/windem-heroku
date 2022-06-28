const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "embed",
    aliases: ["emb", "test-embed"],
    desc: "Sirve para comprobar Embeds",
    run: async (client, message, member, args, prefix) => {
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Bienvenid@ a 💀 WINDEM 💀')
        .setURL('https://discord.gg/sqAYjusc')
        .setDescription(`Hola <@${message.author.id}>!, 

        **${message.guild.name}** es tu nuevo hogar!`)
        .setThumbnail(message.guild.iconURL())
     //   .addFields(
     //       { name: 'Regular field title', value: 'Some value here' },
     //       { name: '\u200B', value: '\u200B' },
     //       { name: 'Inline field title', value: 'Some value here', inline: true },
     //       { name: 'Inline field title', value: 'Some value here', inline: true },
    //    )
        .addField('Inline field title', 'Some value here', true)
        .setImage('attachment://welcome.png')
        .setTimestamp()
        .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL(), url: 'https://discord.gg/sqAYjusc' });

        message.reply({ embeds: [exampleEmbed], files: ['./welcome.png'] });
        //message.channel.send({ embed: embedDatos });
    //    message.reply({ embed: embedDatos })
    }
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarollado por dewstouh#1088 || - ||    ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/
