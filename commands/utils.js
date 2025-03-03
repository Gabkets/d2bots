const Discord = require('discord.js');

const utils = {
    crearRaid: async (raid, channel, client) => {
        let template = new Discord.RichEmbed()
            .setColor('#f39c12')
            .setTitle(raid.title)
            .setDescription(raid.descripcion)
            .setThumbnail('https://res.cloudinary.com/gabke/image/upload/c_scale,w_50/v1560103542/contorno_sin_cuervo_w3dyyn.png')
            .addField('Fecha: ', raid.datetime, true)
            .addField('Equipo: ', 'Esperando Guardianes', false)
            .addField('Reserva: ', 'Esperando Guardianes', false)
            .setImage(raid.imagen)
            .setTimestamp()
            .setFooter('d2RaidCreator');
        if(!!channel){
            channel.send(template).then((msg)=>{
                msg.react('☑');
                msg.react('🔁');
            }).catch((e)=>{
                console.log(e);
            });
        }            
    },
    actionAgregaraLista: (campo, cantidad, reaction, user)  => {
        const receivedEmbed = reaction.message.embeds[0];
        const newTemplate = new Discord.RichEmbed(receivedEmbed);

        if(receivedEmbed.fields[campo].value === 'Esperando Guardianes'){
            receivedEmbed.fields[campo].value = `${user.tag}`;
        } else {
            receivedEmbed.fields[campo].value = `${receivedEmbed.fields[campo].value}\n${user.tag}`;
        }

        reaction.message.edit(newTemplate);

    },
    actionRemoverDeLista: (campo, cantidad, message, user)  => {
        const receivedEmbed = message.embeds[0];
        const newTemplate = new Discord.RichEmbed(receivedEmbed);
        let listajugadores = receivedEmbed.fields[campo].value.split(`${user.tag}`).join('\n');
    
        if(listajugadores.length > 1 && listajugadores !== 'Esperando Guardianes'){
            newTemplate.fields[campo].value = listajugadores;
        } else {
            newTemplate.fields[campo].value = 'Esperando Guardianes';
        }
    
        message.edit(newTemplate);
    },
    toArray: (values) => {
        return Object.values(values);
    }
};

module.exports = utils;