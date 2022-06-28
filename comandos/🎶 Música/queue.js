const Discord = require('discord.js')
module.exports = {
  name: 'queue',
  aliases: ['q', 'cola'],
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | Ninguna canción en reproducción!`)
      .setColor("#b362ef")
      ]})
    const q = queue.songs
      .map((song, i) => `${i === 0 ? 'Reproduciendo:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
      .join('\n')
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.queue} | **Cola del servidor**\n${q}`)
      .setColor("#b362ef")
      ]})
  }
}
