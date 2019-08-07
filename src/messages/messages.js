module.exports = {
    alertMessage: () =>{
        bot.on('message', (message) => {
            if(message.channel.id === config.channels.production && message.author.bot && message.author.username === 'D2RaidCreator' ) {
                const rol = message.guild.roles.find(role => role.name === "Destiny");
                bot.channels.get('468753784131158016').send(`${rol} se creo una raid en <#505098970616299541>`);
            }
        })
    },
    raidMessage: async (raid, channel, client) => {
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
}