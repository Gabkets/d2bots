const utils = require('./commands/utils.js');

module.exports = {
    onMessageReaction: (client, actions, channelId) => {
        client.on('raw', packet => {
            if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
            // Grab the channel to check the message from
            const channel = client.channels.get(channelId);

            channel.fetchMessage(packet.d.message_id).then(message => {
                // Emojis can have identifiers of name:id format, so we have to account for that case as well
                const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
                // This gives us the reaction we need to emit the event properly, in top of the message object
                const reaction = message.reactions.get(emoji);
                // Adds the currently reacting user to the reaction's users collection.
                if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
                // Check which type of event it is before emitting
                if (packet.t === 'MESSAGE_REACTION_ADD') {
                    actions.onAddReaction(client);
                }
                if (packet.t === 'MESSAGE_REACTION_REMOVE') {
                    actions.onRemoveReaction(client);
                }
            });
        });
    }
}