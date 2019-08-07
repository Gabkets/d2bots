const config = require('../config.js');
const utils = require('./utils.js');
const database = config.database;
const activeChannel = config.channels.production;

module.exports = async (client) => {
    database.ref('/Raids/Agenda').on('value', snapshot => {  
        if(snapshot.val()){                
            let largo = Object.values(snapshot.val()).length - 1;
            this.raid = Object.values(snapshot.val())[largo];
                    
            utils.crearRaid(this.raid, client.channels.get(activeChannel), client);
        }
    });
}