const utils = require('./commands/utils.js');

module.exports = {
   raidEmiter: ()=> {
       return {
            onAddReaction: (client) => {
                client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
                if(reaction.emoji.name === '🔁' && client.users.get(packet.d.user_id).username !== 'D2RaidCreator'){
                    utils.actionAgregaraLista(2, 7, reaction, client.users.get(packet.d.user_id));
                }
                if(reaction.emoji.name === '☑' && reaction.count < 8  && client.users.get(packet.d.user_id).username !== 'D2RaidCreator'){
                    utils.actionAgregaraLista(1, 7, reaction, client.users.get(packet.d.user_id)) ;
                }
            },
            onRemoveReaction: (client) => {
                client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
                if(emoji === '🔁'){
                    utils.actionRemoverDeLista(2, 7, message, client.users.get(packet.d.user_id));
                }
                if(emoji === '☑'){
                    utils.actionRemoverDeLista(1, 7, message, client.users.get(packet.d.user_id)) ;
                }
            }
       }
   }
}