const Discord = require('discord.js');

const utils = {
    crearRaid: async (raid, channel, client) => {
        let template = new Discord.RichEmbed()
            .setColor('#f39c12')
            .setTitle(raid.title)
            .setDescription(raid.descripcion)
            .setThumbnail('https://res.cloudinary.com/gabke/image/upload/c_scale,w_50/v1560103542/contorno_sin_cuervo_w3dyyn.png')
            .addField('Fecha: ', raid.datetime, true)
            .addField('Luz', raid.luz, false)
            .addField('Equipo: ', 'Esperando Guardianes', false)
            .addField('Reserva: ', 'Esperando Guardianes', false)
            .setImage(raid.imagen)
            .setTimestamp()
            .setFooter('d2RaidCreator');

        channel.send(template).then((msg)=>{
            msg.react('☑');
            msg.react('🔁');
        });
    },
    actionAgregaraLista: async (campo, cantidad, reaction, user)  => {
        const receivedEmbed = reaction.message.embeds[0];
        const newTemplate = new Discord.RichEmbed(receivedEmbed);

        if(receivedEmbed.fields[campo].value === 'Esperando Guardianes'){
            receivedEmbed.fields[campo].value = user.username;
        } else {
            receivedEmbed.fields[campo].value = receivedEmbed.fields[campo].value + '\n' + user.username;
        }

        let reacted = await reaction.message.edit(newTemplate);

        return new Promise(resolve => {
            setTimeout(() => {
              resolve(reacted);
            }, 5000);
        });
    },
    actionRemoverDeLista: async (campo, cantidad, reaction, user)  => {
        const receivedEmbed = reaction.message.embeds[0];
        const newTemplate = new Discord.RichEmbed(receivedEmbed);
        let listajugadores = receivedEmbed.fields[campo].value.split(user.username).join('\n');
    
        if(listajugadores.length > 1 && listajugadores !== 'Esperando Guardianes'){
            newTemplate.fields[campo].value = listajugadores;
        } else {
            newTemplate.fields[campo].value = 'Esperando Guardianes';
        }
    
        let reacted = await reaction.message.edit(newTemplate);

        return new Promise(resolve => {
            setTimeout(() => {
              resolve(reacted);
            }, 5000);
        });
    },
    toArray: (values) => {
        return Object.values(values);
    }
};

module.exports = utils;