const Discord = require('discord.js')
module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause', 'resumir', 'continuar'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
        .setColor("#b362ef")
        ]})
        if (!queue.paused) {
          return
        }
        if (queue.paused) {
          queue.resume()
          message.channel.send({
          embeds: [new Discord.MessageEmbed()
          .setDescription('Cancion resumida para ti :)')
          .setColor("#b362ef")
          ]})
        }
    
  }
}
