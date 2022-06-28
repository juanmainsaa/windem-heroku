const Discord = require('discord.js')
module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'leave'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
      .setColor("#b362ef")
      ]})
    queue.stop()
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.success} | Se paro la reproducción!`)
      .setColor("#b362ef")
      ]} 
      )
  }
}
