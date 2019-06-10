const config = require('./config.js');
const Discord = require('discord.js');
const bot = require('./bot.js');
const client = new Discord.Client();
const activeBot = new Discord.Client();

bot.raidCreator(client);
bot.activeBot(activeBot, config.activeBotToken)