const config = require('./config.js');
const Discord = require('discord.js');
const bot = require('./bot.js');
const express = require('express');
const client = new Discord.Client();
const database = config.database;
const activeChannel = config.channels.production;
const app = express();
const PORT = process.env.PORT || 5000;
const utils = require('./commands/utils.js');

/*
client.login(config.discordToken);
bot.botActions(client);

database.ref('/Raids/Agenda').on('value', snapshot => {  
    if(snapshot.val()){                
        let largo = Object.values(snapshot.val()).length - 1;
        this.raid = Object.values(snapshot.val())[largo];          
        utils.crearRaid(this.raid, client.channels.get(activeChannel), client);
    }
});


app.get('/', function (req, res) {
    res.send('weaking up robots')
});

app.listen(PORT, function () {
    console.log('Example app listening on port 5000!');
});*/