const Discord = require('discord.js')
module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold', 'pausa', 'pausar'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
        .setColor("#b362ef")
        ]})
        if (queue.paused) {
          queue.resume()
      return message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription('Cancion resumida para ti :)')
        .setColor("#b362ef")
        ]})
    }
    if (!queue.paused) {
    queue.pause()
    message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription('Cancion pausada para ti :)')
        .setColor("#b362ef")
        ]})
  }
  }
}