const mongoose = require('mongoose');
const config = require('../../config/config.json');
module.exports = client => {
    const Estado = [
            `Carrear a tu vieja`,
            `Carrear a Corvina`,
            `Carrear a Kmello`,
            `Robar comandos`,
            `Mejorar el servidor`
        ];
    setInterval(() => {
        client.user.setPresence({ activities: [{ name: Estado[Math.floor(Math.random() * Estado.length)] }], status: 'online', type: "WATCHING" })
        }, 10000);
    //Nos conectamos a la base de datos

    let palo = 53;

    mongoose.connect(config.mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log(`
╔═════════════════════════════════════════════════════╗
║       Conectado a la base de datos de MONGODB!      ║
╚═════════════════════════════════════════════════════╝`.blue)
    }).catch((err) => {
        console.log(`☁ ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB`.red);
        console.log(err)
    })

    console.log(`╔═════════════════════════════════════════════════════╗`.green)
    console.log(`║ `.green + `      Conectado como ${client.user.tag}`.green + " ".repeat(-1 + palo - 1 - `      Conectado como ${client.user.tag}`.length) + " ║".green)
    console.log(`╚═════════════════════════════════════════════════════╝`.green)
}

/*
╔═════════════════════════════════════════════════════╗
║    || - || Desarollado por dewstouh#1088 || - ||    ║
║    ----------| discord.gg/MBPsvcphGf |----------    ║
╚═════════════════════════════════════════════════════╝
*/
