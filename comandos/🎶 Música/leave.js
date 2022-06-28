module.exports = {
  name: 'leave',
  aliases: ['salir'],
  run: async (client, message) => {
    client.distube.voices.leave(message)
  }
}
