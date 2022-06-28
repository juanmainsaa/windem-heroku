const { Constants } = require('discord.js')
const Discord = require('discord.js')
module.exports = {
  name: 'join',
  aliases: ['move'],
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send({
          embeds: [new Discord.MessageEmbed()
          .setDescription(`${client.emotes.error} | ${args[0]} No es un canal de voz valido!`)
          .setColor("#b362ef")
          ]}
          )
      }
    }
    if (!voiceChannel) {
      return message.channel.send({
          embeds: [new Discord.MessageEmbed()
          .setDescription(`${client.emotes.error} | Debes estar en un canal de voz o ingresar el ID del canal.`)
          .setColor("#b362ef")
          ]}     
      )
    }
    client.distube.voices.join(voiceChannel)
  }
}
