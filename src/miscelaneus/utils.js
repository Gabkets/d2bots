const Discord = require('discord.js');

module.exports = {
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

