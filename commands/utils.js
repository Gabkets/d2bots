const config = require('../config.js');
const Discord = require('discord.js');
const prefix = config.prefix;
const database = config.database;

module.exports = {
    crearRaid: async (raid, channel, client) => {
        let template = new Discord.RichEmbed()
            .setColor('#f39c12')
            .setTitle('Raid: ' + raid.title)
            .setDescription(raid.descripcion)
            .setThumbnail(client.user.avatarURL)
            .addField('Fecha: ', raid.fecha, true)
            .addField('Hora: ', raid.hora + ':flag_uy:', true)
            .addField('Luz', raid.luz, false)
            .addField('Equipo: ', 'Esperando Guardianes', false)
            .addField('Reserva: ', 'Esperando Guardianes', false)
            .setImage(raid.imagen)
            .setTimestamp()
            .setFooter(client.user.username);

        channel.send(template);
    },
    toArray: (values) => {
        return Object.values(values);
    }
}