const CrearRaid = require('./commands/CrearRaid.js');
const Discord = require('discord.js');
const config = require('./config.js');

module.exports = {
    raidCreator: (client) => {
        CrearRaid(client);
    },
    activeBot: (bot, token) => {
        bot.login(token);
        bot.on('ready', () => {
                    
        });

        bot.on('message', (msg)=> {
            if(msg.author.username === 'D2RaidCreator'){
                msg.react('☑');
                msg.react('🔁');
            }
        });

        const actionAgregaraLista = (campo, cantidad, reaction, user)  => {
            const receivedEmbed = reaction.message.embeds[0];
            const exampleEmbed = new Discord.RichEmbed(receivedEmbed);
            const client = new Discord.Client();

            if(receivedEmbed.fields[campo].value === 'Esperando Guardianes') {
                receivedEmbed.fields[campo].value = user.username + '\n' ;
            } else {
                receivedEmbed.fields[campo].value = receivedEmbed.fields[3].value + '\n'  + user.username;
            }
                        
            client.login(config.discordToken);

            client.on('ready', () => {
                client.message = reaction.message;
                client.message.edit(exampleEmbed);
            });
        }

        bot.on('messageReactionAdd', (reaction, user) => {
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
    }
}