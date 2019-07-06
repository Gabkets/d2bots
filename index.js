const config = require('./config.js');
const Discord = require('discord.js');
const bot = require('./bot.js');
const express = require('express');
const client = new Discord.Client();
const app = express();

client.login(config.discordToken);
client.on('ready', () => {
    bot.raidCreator(client);
    bot.botActions(client);
});

app.get('/', function (req, res) {
    res.send('weaking up robots')
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});