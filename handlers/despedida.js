const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');

module.exports = client => {
    console.log("Modulo de DESPEDIDA cargado!".green);
    client.on("guildMemberRemove", (member) => {
        const WelcomeEmbed = new MessageEmbed()
        .setColor('#b362ef')
        .setTitle('Se nos fue un miembro!')
        .setURL('https://discord.gg/sqAYjusc')
        .setDescription(`Hasta luego <@${member.id}>! 
        Lamentamos tu salida!`)
        .setThumbnail(member.user.displayAvatarURL({ format: 'jpg' }))
        .setTimestamp()
        .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL(), url: 'https://discord.gg/sqAYjusc' });
        client.channels.cache.get("980309711364710482").send({ embeds: [WelcomeEmbed]});
  })
}
