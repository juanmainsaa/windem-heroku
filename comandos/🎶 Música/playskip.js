const Discord = require('discord.js')
module.exports = {
  name: 'playskip',
  aliases: ['ps'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join(' ')
    if (!string) return message.channel.send({
      embeds: [new Discord.MessageEmbed()
      .setDescription(`${client.emotes.error} | Ingrese una URL de canción o consulta para buscar.`)
      .setColor("#b362ef")
      ]})
      let channel = await message.member.voice.channel;
      if (!channel) {
        message.channel.send({
          embeds: [new Discord.MessageEmbed()
          .setDescription(`${client.emotes.error} | Primero ingresa a un canal de voz!`)
          .setColor("#b362ef")
          ]});
      } else {
        client.distube.play(message.member.voice.channel, string, {
          member: message.member,
          textChannel: message.channel,
          message,
          skip: true
        })
      }
    
  }
}
