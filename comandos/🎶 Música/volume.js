const Discord = require('discord.js')
module.exports = {
  name: 'volume',
  aliases: ['v', 'volumen', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay canciones en cola actualmente!`)
      .setColor("#b362ef")
      ]}
      )
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | Ingresa un número valido!`)
      .setColor("#b362ef")
      ]}
      )
    queue.setVolume(volume)
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.success} | Volumen asignado en: \`${volume}\``)
      .setColor("#b362ef")
      ]}
    )
  }
}
