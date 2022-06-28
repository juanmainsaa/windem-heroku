const Discord = require('discord.js')
module.exports = {
  name: 'shuffle',
  aliases: ['mezclar'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
      .setColor("#b362ef")
      ]})
    queue.shuffle()
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription('Canciones de la cola mezcladas.')
      .setColor("#b362ef")
      ]})
  }
}
