const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;
const Genius = require("genius-lyrics");
const Client = new Genius.Client("KSmxgB75wbooIzavgS1OG7b8pWlggwWf7Q_M5Fp-muuE6sKdqL6pNDQqmzaXHMl8");




module.exports = {
    name: "lyrics",
    aliases: ['letra'],
    run: async (client, message, args) => {
        const string = args.join(' ')
        if (!string) return message.channel.send({
            embeds: [new MessageEmbed()
            .setDescription(`${client.emotes.error} | Ingrese una Letra para realizar la busqueda.`)
            .setColor("#b362ef")
            ]})
        const searches = await Client.songs.search(string);

        // Pick first one
        const firstSong = searches[0];
        // Ok lets get the lyrics
        const lyrics = await firstSong.lyrics();
        message.channel.send({
            embeds: [new MessageEmbed()
            .setDescription(`Lyrics of the Song:\n ${lyrics}\n`)
            .setColor("#b362ef")
            ]});
    }
  };