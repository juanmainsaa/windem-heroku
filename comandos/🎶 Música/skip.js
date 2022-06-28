const Discord = require('discord.js')
module.exports = {
  name: 'skip',
  aliases: ['saltear'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
      .setColor("#b362ef")
      ]})
    try {
      const song = await queue.skip()
      message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.success} | Salteado! Ahora reproduciendo:\n${song.name}`)
        .setColor("#b362ef")
        ]})
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}
