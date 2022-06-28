const Discord = require('discord.js')
module.exports = {
  name: 'filter',
  aliases: ['filters', 'filtros'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
      .setColor("#b362ef")
      ]})
    if (args[0] === 'off' && queue.filters?.length) queue.setFilter(false)
    else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
    else if (args[0]) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No es un filtro valido`)
      .setColor("#b362ef")
      ]})
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`Filtro actual: \`${queue.filters.join(', ') || 'Off'}\``)
      .setColor("#b362ef")
      ]})
  }
}
