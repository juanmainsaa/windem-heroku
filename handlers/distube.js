const {DisTube} = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const progressbar = require('string-progressbar');
const { filledBar } = require('string-progressbar');
const Genius = require("genius-lyrics");
const Client = new Genius.Client("KSmxgB75wbooIzavgS1OG7b8pWlggwWf7Q_M5Fp-muuE6sKdqL6pNDQqmzaXHMl8");
const config = require(`${process.cwd()}/config/config.json`)


const Discord = require('discord.js')

module.exports = async (client, Discord,) => {
    
    console.log(`Modulo de MÚSICA Cargado!`.red)
    client.config = require(`${process.cwd()}/config/config.json`)
    client.emotes = config.emoji
    client.distube = new DisTube(client, {
        emitNewSongOnly: false,
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        savePreviousSongs: true,
        emitAddSongWhenCreatingQueue: false,
        searchSongs: 0,
        nsfw: false,
        emptyCooldown: 25,
        ytdlOptions: {
            highWaterMark: 1024 * 1024 * 64,
            quality: "highestaudio",
            format: "audioonly",
            liveBuffer: 60000,
            dlChunkSize: 1024 * 1024 * 4,
        },
        youtubeDL: false,
        plugins: [
            new SpotifyPlugin({
                parallel: true,
                emitEventsAfterFetching: true,
            }),
            new SoundCloudPlugin(),
            new YtDlpPlugin()
        ],
        youtubeDL: false
    });

    //escuchamos los eventos de DisTube

    const status = queue =>
    `    Volumen: \`${queue.volume}%\` | Filtro: \`${queue.filters.join(', ') || 'No'}\` | Repetir: \`${
      queue.repeatMode ? (queue.repeatMode === 2 ? 'Lista' : 'Canción') : 'No'
    }\` | Autoplay: \`${queue.autoplay ? 'Si' : 'No'}\``






    // BOTONES INDIVIDUALES //
    const pausebut = new Discord.MessageButton().setCustomId(`pause_but`).setEmoji("987882699526139975").setStyle("SECONDARY").setDisabled(false);
    const resumebut = new Discord.MessageButton().setCustomId(`resume_but`).setEmoji("987886090440572979").setStyle("SECONDARY").setDisabled(false);
    const autoplay = new Discord.MessageButton().setCustomId(`autoplay_but`).setEmoji("987889319333199923").setStyle("SECONDARY").setDisabled(false);
    const lowvolumebut = new Discord.MessageButton().setCustomId(`lowvolume_but`).setEmoji("980867256617668648").setStyle("SECONDARY").setDisabled(false);
    const highvolumebut = new Discord.MessageButton().setCustomId(`highvolume_but`).setEmoji("980866969970556998").setStyle("SECONDARY").setDisabled(false);
    const previousbut = new Discord.MessageButton().setCustomId(`previous_but`).setEmoji("980873116312023080").setStyle("SECONDARY").setDisabled(false);
    const skipbut = new Discord.MessageButton().setCustomId(`skipbut_but`).setEmoji("980873232779448390").setStyle("SECONDARY").setDisabled(false);
    const loopbut = new Discord.MessageButton().setCustomId(`loop_but`).setEmoji("987904185766920232").setStyle("SECONDARY").setDisabled(false);
    const stopbut = new Discord.MessageButton().setCustomId(`stop_but`).setEmoji("987924606612557895").setStyle("SECONDARY").setDisabled(false);
    const shufflebut = new Discord.MessageButton().setCustomId(`shuffle_but`).setEmoji("987924608479035452").setStyle("SECONDARY").setDisabled(false);
    const lyricbut = new Discord.MessageButton().setCustomId(`lyric_but`).setEmoji("988537194278965349").setStyle("SECONDARY").setDisabled(false);



    // BOTONES agrupados//
    const botones = new Discord.MessageActionRow().addComponents(previousbut, pausebut, stopbut,autoplay, skipbut);
    const botones2 = new Discord.MessageActionRow().addComponents(lowvolumebut, highvolumebut, loopbut, shufflebut, lyricbut);
    const botonespaused = new Discord.MessageActionRow().addComponents(previousbut, resumebut, stopbut,autoplay, skipbut);
    const botonesplaying = new Discord.MessageActionRow().addComponents(previousbut, pausebut, stopbut,autoplay, skipbut);





    client.distube
    .on('playSong', async (queue, song, volume, message) =>
 {
      
      let ChannelID = queue.textChannel.id
      var string = `${song.name}`;
      var length = 50;
      var short = 38;
      var trimmedString = string.length > length ? 
      string.substring(0, length - 3) + "..." : 
      string;
      var trimmedShort = string.length > short ?
      string.substring(0, short - 3) + "..." : 
      string;

          // EMBEDS //
    const embedplaying = new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png').setDescription(`[${trimmedString} - ${song.formattedDuration}](${song.url})\n\n${status(queue)}`).setColor("#b362ef");
    const embedpaused = new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png').setDescription(`[${trimmedString} - ${song.formattedDuration}](${song.url})\n\n${status(queue)}`).setColor("#b362ef");
    const embedprev = new Discord.MessageEmbed().setTitle(`<:next:987982303118639124> | Siguiente \n\`[${trimmedString} - ${song.formattedDuration}](${song.url})\``).setColor("#b362ef");
    const embednext = new Discord.MessageEmbed().setTitle(`<:prev:987978423240654889> | Anterior \n\`[${trimmedString} - ${song.formattedDuration}](${song.url})\``).setColor("#b362ef");


    let track = queue.songs[0];

    let m = await queue.textChannel.send({
      embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
      .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],
       components: [botones, botones2]
   
    });
    let mID = m.id

     client.distube
    .on('finishSong', async (song) => {
      if (!queue) {
        return
      }
      if (queue.stopped) return
      if (queue.prev) return
      else
      {
      m.edit({ embeds: [new Discord.MessageEmbed().setDescription(`<:prev:987978423240654889> | Anterior \`${trimmedShort}\``).setColor("#b362ef")],components: []});
      };
    })

    const collector = m.createMessageComponentCollector({ filter: i => i.isButton() && i.user && i.message.author.id == client.user.id, time: 400e3})
    collector.on("collect", async (interaction, message) => {
      if (interaction.isButton()) {
        switch (interaction.customId) {
          case "skipbut_but":
            {
              if (!queue) {
                return message.channel.send(`** No hay Música en reproducción. **`)
              }
              if (queue.autoplay || queue.songs.length > 1){
                if (!queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setDescription(`<:prev:987978423240654889> | Anterior \`${trimmedShort} - ${song.formattedDuration}\``).setColor("#b362ef")],components: []});
                  queue.skip(message)}
                  return;
                }
                if (queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                  .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
                }
              else return;
            //  await queue.skip()
              await interaction?.deferUpdate();
            }
            break;
          case "previous_but":
            {
              if (queue.previousSongs.length < 1) return;
              {
              await queue.previous();
                if (!queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setDescription(`<:next:987982303118639124> | Siguiente \`${trimmedShort} - ${song.formattedDuration}\``).setColor("#b362ef")],components: []})
                  //queue.skip(message)
                }
                if (queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                  .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
                }
              }
              await interaction?.deferUpdate();
            }
            break;
            case "highvolume_but":
            {
              await interaction?.deferUpdate();
              await queue.setVolume(queue.volume + 10);
              if (!queue.paused) {
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonesplaying, botones2]})
              }
              if (queue.paused) {
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
              }
            }
            break;
            case "lowvolume_but":
            {
              await interaction?.deferUpdate();
              await queue.setVolume(queue.volume - 10);
              if (!queue.paused) {
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonesplaying, botones2]})
              }
              if (queue.paused) {
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
              }
              
            }
            break;
            case "pause_but":
            {
              await interaction?.deferUpdate();
              if (!queue.paused) {
                queue.pause();
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
              }
            }
            break;
            case "resume_but":
            {
              await interaction?.deferUpdate();
              if (queue.paused) {
                queue.resume();
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonesplaying, botones2]})
              }
            }
            break;
            case "autoplay_but":
              {
                await interaction?.deferUpdate();
                queue.toggleAutoplay()
                if (!queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                  .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonesplaying, botones2]})
                }
                if (queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                  .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
                }
              }
              break;
              case "loop_but":
                {
              await interaction?.deferUpdate();
               queue.setRepeatMode()
               if (!queue.paused) {
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonesplaying, botones2]})
              }
              if (queue.paused) {
                await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
              }
              }
              break;
              case "stop_but":
              {
                await interaction?.deferUpdate();
               queue.stop()
               await m.edit({ embeds: [new Discord.MessageEmbed().setDescription(`Esta Reproducción fue detenida por ${song.user.username}`).setColor("#b362ef")], components: []});
              }
              break;
              case "shuffle_but":
              {
                await interaction?.deferUpdate();
                queue.shuffle()
                if (!queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Reproduciendo...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                  .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonesplaying, botones2]})
                }
                if (queue.paused) {
                  await m.edit({ embeds: [new Discord.MessageEmbed().setTitle(`<:viniloMUSICA:988191479770005585> | Pausado...`).setThumbnail('https://i.imgur.com/fSwwvs8.png')
                  .setDescription(`[${trimmedString}](${song.url})\n Duración: ${song.formattedDuration}\n \ \ \ \  ${status(queue)}`).setColor("#b362ef")],components: [botonespaused, botones2]})
                }
              }
              break;
              case "lyric_but":
                {
                  await interaction?.deferUpdate();
                  if(!queue.paused){
                  const searches = await Client.songs.search(`${song.name}`);
                    // Pick first one
                    const firstSong = searches[0];
                    // Ok lets get the lyrics
                    const lyrics2 = await firstSong?.lyrics().catch(err => console.error(err));
                    var letra = `${lyrics2}`;
                    var length2 = 4080;
                    var trimmedString2 = letra.length > length2 ? 
                    letra.substring(0, length2 - 3) + "..." : 
                    letra;
                    let msg = await queue.textChannel.send({
                        embeds: [new Discord.MessageEmbed()
                        .setDescription(`${trimmedString2}\n`)
                        .setColor("#b362ef")
                        ]}).catch(err => console.error(err));
                        setTimeout(function(){ 
                         msg.delete();
                       }, 4 * 60000); //time in milliseconds
                  }
                  else return
              }
              break;
        }
      }
    })
        
  }
    )

    .on('addSong', (queue, song) =>
      queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
               .setDescription(`<:viniloMUSICA:988191479770005585> | Agregado ${song.name} - \`${song.formattedDuration}\``)
               .setColor("#b362ef")
               .setFooter({text: `Añadido por ${song.user.username}`, iconURL: song.user.displayAvatarURL({dynamic: true})})
                ]}       
      )
    )
    .on('addList', (queue, playlist) =>
      queue.textChannel.send({
            embeds: [new Discord.MessageEmbed()
                .setDescription(`<:viniloMUSICA:988191479770005585> | Agragada la Lista \`${playlist.name}\` - (${playlist.songs.length} canciones)`)
                .setColor("#b362ef")
                .setFooter({text: `Lista añadida por ${playlist.user.username}`, iconURL: playlist.user.displayAvatarURL({dynamic: true})})
                ]}
      )
    )
    .on('error', (channel, e) => {
      channel.send(`<:Ff:857761972494139422> | Ocurrio un error: ${e.toString().slice(0, 1974)}`)
      console.error(e)
    })
    .on('empty',async (queue) => queue.textChannel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription('Canal de voz vacio! Saliendo del canal...')
        .setColor("#b362ef")
        ]}
        ))
    .on('searchNoResult', (message, query) =>
      message.channel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription(`<:Ff:857761972494139422> | No se encontro lo que buscabas. \`${query}\`!`)
        .setColor("#b362ef")
        ]}
          
        )
    )
    .on('finish', queue => queue.textChannel.send({
        embeds: [new Discord.MessageEmbed()
        .setDescription('<:viniloMUSICA:988191479770005585> | Finalizado! Me quede sin canciones en la Lista <:Ff:857761972494139422>')
        .setColor("#b362ef")
        ]}
));
}





//  pause_but
//  lowvolume_but_
//  highvolume_but_
//  previous_but_
//  skipbut_but_

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarollado por dewstouh#1088 || - ||    ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/
