const CrearRaid = require('./commands/CrearRaid.js');

module.exports = {
    raidCreator: (client) => {
        CrearRaid(client);
    },
    activeBot: (bot, token) => {
        bot.login(token);
        bot.on('ready', () => {
            console.log(`Logged in as ${bot.user.tag}!`);            
        });
    }
}