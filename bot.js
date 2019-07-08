const CrearRaid = require('./commands/CrearRaid.js');
const Discord = require('discord.js');
const config = require('./config.js');
const utils = require('./commands/utils.js');

module.exports = {
    raidCreator: (client) => {
        CrearRaid(client);
    },
    botActions: (bot) => {
        bot.on('messageReactionAdd', (reaction, user) => {
            //console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
            if(reaction.message.author.bot && reaction.message.author.username === 'D2RaidCreator' ) {
                if(!user.bot && reaction.emoji.name === '🔁' && reaction.count < 7){
                    utils.actionAgregaraLista(3, 6, reaction, user);
                }

                if(!user.bot && reaction.emoji.name === '☑' && reaction.count < 7){
                    utils.actionAgregaraLista(2, 6, reaction, user) ;
                }
            }
        });

        bot.on('messageReactionRemove', (reaction, user) => {
            //console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
            if(reaction.message.author.bot && reaction.message.author.username === 'D2RaidCreator' ) {
                if(!user.bot && reaction.emoji.name === '🔁'){
                    utils.actionRemoverDeLista(3, 6, reaction, user);
                }

                if(!user.bot && reaction.emoji.name === '☑'){
                    utils.actionRemoverDeLista(2, 6, reaction, user) ;
                }
            }
        });

        bot.on('message', (message) => {
            if(message.channel.id === config.channels.production && message.author.bot && message.author.username === 'D2RaidCreator' ) {
                bot.channels.get('468753784131158016').send(`@everyone se creo una raid en <#505098970616299541>`);
            }
        })
    }
}