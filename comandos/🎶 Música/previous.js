const Discord = require('discord.js')
module.exports = {
  name: 'previous',
  aliases: ['anterior', 'prev'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
      .setColor("#b362ef")
      ]})
    const song = queue.previous()
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.success} | Reproduciendo:\n${song.name}`)
      .setColor("#b362ef")
      ]})
  }
}
