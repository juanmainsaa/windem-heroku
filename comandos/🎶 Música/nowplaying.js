const Discord = require('discord.js');
const { filledBar } = require('string-progressbar');
module.exports = {
  name: 'nowplaying',
  aliases: ['np', 'playing'],
  run: async (client, message, volume) => {
    const queue = client.distube.getQueue(message);

    if (!queue) return message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`${client.emotes.error} | Ninguna canción en reproducción!`)
        .setColor("#b362ef")
        ]})
      

    const status = queue =>
    `    Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.join(', ') || 'No'}\` | Repetir: \`${
      queue.repeatMode ? (queue.repeatMode === 2 ? 'Lista' : 'Canción') : 'No'
    }\` | Autoplay: \`${queue.autoplay ? 'Si' : 'No'}\``;

    let track = queue.songs[0];
    let song =  queue.songs[0];
    var string = `${song.name}`;
    var length = 50;
    var trimmedString = string.length > length ? 
    string.substring(0, length - 3) + "..." : 
    string;

    if (queue) {
    const np = await message.channel.send({
      embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
      .setDescription(`[${trimmedString}](${song.url})\n${queue.formattedCurrentTime}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀ ${song.formattedDuration}\n${filledBar(track.duration, queue.currentTime, 17, '<:cuadradosilver:990277877276749904>', '<:128cuadwindem3:990299473970343977>')[0]}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")]});
  }}
}
