const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'NTg2NDA4NzI0NzUxNDUwMTI1.XPnqTw.s09yBN4aYts1nv2hqatgl33HSzE';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const raidTemplate = (content) => {
    const msg = content.split('!CreateRaid')[1];
    let attrs = msg.split('-');
    template = {};

    attrs.forEach((attr) => {    
        let texto = attr.split(':')[1];

        if(attr.startsWith('Raid')){
            template.title = texto;
        }
        if(attr.startsWith('Fecha')){
            template.fecha = texto;
        }
        if(attr.startsWith('Hora')){
            template.hora = texto;
        }
        if(attr.startsWith('Luz')){
            template.luz = texto;
        }
        if(attr.startsWith('Comentario')){
            template.comentario = texto;
        }
    });

    return template;
}

const removerJugador = (listJugadores, removido) => {
  return listJugadores.split(removido).join('\n');
}

const actionRemoverDeLista = (campo, cantidad, reaction, user)  => {
    const receivedEmbed = reaction.message.embeds[0];
    const exampleEmbed = new Discord.RichEmbed(receivedEmbed);
    let listajugadores = removerJugador(receivedEmbed.fields[3].value, user.username);

    if(listajugadores.length > 1){
      receivedEmbed.fields[campo].value = listajugadores;
    } else {
      receivedEmbed.fields[campo].value = 'Esperando Guardianes';
    }

    reaction.message.edit(exampleEmbed);
}
const actionAgregaraLista = (campo, cantidad, reaction, user)  => {
  const receivedEmbed = reaction.message.embeds[0];
  const exampleEmbed = new Discord.RichEmbed(receivedEmbed);
  if(receivedEmbed.fields[campo].value === 'Esperando Guardianes') {
    receivedEmbed.fields[campo].value = user.username + '\n' ;
  } else {
    receivedEmbed.fields[campo].value = receivedEmbed.fields[3].value + '\n'  + user.username;
  }

  reaction.message.edit(exampleEmbed);
}

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('Pong!');
  }

  if(message.content.startsWith('!CreateRaid')){
    let raid = raidTemplate(message.content);
   
    let template = new Discord.RichEmbed()
    .setColor('#0099ff')
    .setTitle('Raid: ' + raid.title)
    .setDescription(raid.comentario)
    .setThumbnail(client.user.avatarURL)
    .addField('Fecha: ', raid.fecha, true)
    .addField('Hora: ', raid.hora + ':flag_uy:', true)
    .addField('Luz', raid.luz, false)
    .addField('Equipo: ', 'Esperando Guardianes', false)
    .addField('Reserva: ', 'Esperando Guardianes', false)
    .setTimestamp()
    .setFooter(client.user.username);

    // TODO: Arreglar coicidencias. No debería pasar teniendo el formulario creado.
    if(raid.title.toUpperCase() === 'LEVIATAN' || raid.title.toUpperCase()  === 'LEVIATHAN') {
      template.setImage('https://res.cloudinary.com/gabke/image/upload/v1560017762/destiny2/leviatan.jpg');
    }

    if(raid.title.toUpperCase() === 'ULTIMO DESEO' || raid.title.toUpperCase()  === 'LAST WISH' ) {
      template.setImage('https://res.cloudinary.com/gabke/image/upload/v1560017762/destiny2/lastwish.jpg');      
    }

    message.reply('Creando raid');

    client.channels.get("586451986585485323").send(template).then(msg=>{
      msg.react('☑');
      msg.react('🔁');
    });
  }
});

client.on('messageReactionAdd', (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  if(reaction.message.author.bot && reaction.message.author.username === 'D2RaidCreator' ) {
    if(!user.bot && reaction.emoji.name === '🔁'){
      actionAgregaraLista(4, 6, reaction, user);
    }
    if(!user.bot && reaction.emoji.name === '☑'){
      actionAgregaraLista(3, 6, reaction, user) ;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  if(reaction.message.author.bot && reaction.message.author.username === 'D2RaidCreator' ) {
    if(!user.bot && reaction.emoji.name === '🔁'){
      actionRemoverDeLista(4, 6, reaction, user);
    }
    if(!user.bot && reaction.emoji.name === '☑'){
      actionRemoverDeLista(3, 6, reaction, user) ;
    }
  } 
});


client.login(token);