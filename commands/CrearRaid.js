const config = require('../config.js');
const utils = require('./utils.js');
const database = config.database;

module.exports = async (client) => {
    database.ref('/Raids/Agenda').on('value', snapshot => {  
        if(snapshot.val()){                
            let largo = Object.values(snapshot.val()).length - 1;
            this.raid = Object.values(snapshot.val())[largo];
            client.login(config.discordToken);
            client.on('ready', () => {
                console.log(`Logged in as ${client.user.tag}!`);            
                utils.crearRaid(this.raid, client.channels.get('586451986585485323'), client).then(()=>{
                    client.destroy();
                });
            });
        }
    });
}