const config = require('./config.js');
const Discord = require('discord.js');
const bot = require('./bot.js');
const express = require('express');
const client = new Discord.Client();
const app = express();
const PORT = process.env.PORT || 5000;

client.login(config.discordToken);
client.on('ready', () => {
    bot.raidCreator(client);
    bot.botActions(client);
});

app.get('/', function (req, res) {
    res.send('weaking up robots')
});

app.listen(PORT, function () {
    console.log('Example app listening on port 5000!');
});