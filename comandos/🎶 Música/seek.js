const Discord = require('discord.js')
module.exports = {
  name: 'seek',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
      .setColor("#b362ef")
      ]})
    if (!args[0]) {
      return message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.error} | Por favor ingresa el tiempo (en segundos) para reproducir!`)
        .setColor("#b362ef")
        ]})
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | Por favor, ingresa un número valido!`)
      .setColor("#b362ef")
      ]})
    queue.seek(time)
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`Reproduciendo desde ${time}!`)
      .setColor("#b362ef")
      ]})
  }
}
