const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require('discord.js')

module.exports = {
    name: "ninios",
    aliases: ["pag", "niÃ±os"],
    desc: "Stats de los ninios :D",
    run: async (client, message, args, prefix) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Stats de los Ninios  ð¤ð§")
    .setDescription("ð[Quien se cae mas duro?](http://losninios.tk/)ð")
    message.reply({embeds: [embed]})
    }
}