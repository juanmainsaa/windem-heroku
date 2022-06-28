const Discord = require('discord.js')
module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
        .setColor("#b362ef")
        ]})
    const autoplay = queue.toggleAutoplay()
    message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
        .setColor("#b362ef")
        ]})
  }
}
