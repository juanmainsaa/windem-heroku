const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton} = require('discord.js')

module.exports = {
    name: "ninios",
    aliases: ["pag", "niños"],
    desc: "Stats de los ninios :D",
    run: async (client, message, args, prefix) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Stats de los Ninios  🤓🧃")
    .setDescription("🙏[Quien se cae mas duro?](http://losninios.tk/)🙏")
    message.reply({embeds: [embed]})
    }
}