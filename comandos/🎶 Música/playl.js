const Discord = require('discord.js')
module.exports = {
  name: 'playl',
  aliases: ['pl'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const string = args.join('')
    if (!string) return message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.error} | Ingresa el numero asociado a la lista deseada: \n1. Windem\n2. Chill Vibes\n3. Windem (TRAP) `)
        .setColor("#b362ef")
        ]});
      if(string>3){
          message.channel.send({
            embeds: [new Discord.MessageEmbed()
            .setDescription(`${client.emotes.error} | Ingresa el numero asociado a la lista deseada: \n1. Windem\n2. Chill Vibes\n3. Windem (TRAP)`)
            .setColor("#b362ef")
            ]});
            return;
        }
        let channel = await message.member.voice.channel;
        if (!channel) {
          message.channel.send({
            embeds: [new Discord.MessageEmbed()
            .setDescription(`${client.emotes.error} | Primero ingresa a un canal de voz!`)
            .setColor("#b362ef")
            ]});
        } else {
          if(string == 1){
            client.distube.play(message.member.voice.channel, 'https://open.spotify.com/playlist/1qxt20Xfab4UXYpqbAWxWR?si=52d1419af5ae4a83', {
              member: message.member,
              textChannel: message.channel,
              message
            })};
            if(string == 2){
              client.distube.play(message.member.voice.channel, 'https://open.spotify.com/playlist/3d1p91F4ecOyiYZPAwSNRh?si=27a31b4ea54a4224', {
              member: message.member,
              textChannel: message.channel,
              message
            })};
            if(string == 3){
              client.distube.play(message.member.voice.channel, 'https://open.spotify.com/playlist/6LKsEFQwstuxHYR9VlaqYw?si=df279e27fb9a41d6', {
              member: message.member,
              textChannel: message.channel,
              message
            })};
        }
  }
}
