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

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }

  if(msg.content.startsWith('!CreateRaid')){
    let raid = raidTemplate(msg.content);
   
    let template = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Raid: ' + raid.title)
	.setDescription(raid.comentario)
	.setThumbnail(client.user.avatarURL)
	.addField('Fecha: ', raid.fecha, true)
	.addField('Hora: ', raid.hora + ':flag_uy:', true)
	.addField('Luz', raid.luz, false)
	.setTimestamp()
    .setFooter(client.user.username);
    
    //client.channels.get("505098970616299541").send(raidTemplate(msg.content));
    msg.reply('Creando raid');

    client.channels.get("586451986585485323").send(template);
  }
});

client.login(token);