const Discord = require('discord.js')
module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp', 'repetir'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | No hay anda reproduciendose!`)
      .setColor("#b362ef")
      ]})
    let mode = null
    switch (args[0]) {
      case 'off':
        mode = 0
        break
      case 'song':
        mode = 1
        break
      case 'queue':
        mode = 2
        break
    }
    mode = queue.setRepeatMode(mode)
    mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off'
    message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.repeat} | Modo de repetición ajustado a: \`${mode}\``)
      .setColor("#b362ef")
      ]})
  }
}
