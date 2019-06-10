const firebase = require('firebase');

const firebaseConfig = {
    apiKey: "AIzaSyC7GtZk8GPVUHu1xQrv6fepPvIW6Q1ptmY",
    authDomain: "project-808507223458.firebaseapp.com",
    databaseURL: "https://d2bot-14a14.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

module.exports = {
    database: database,
    discordToken: 'NTg2NDA4NzI0NzUxNDUwMTI1.XPnqTw.s09yBN4aYts1nv2hqatgl33HSzE',
    activeBotToken: 'NTg3NDc3MDQ2MTc5OTIxOTQ0.XP3IqA.KsfVfb3hEh1rxCsIKTLLrP3MLFA',
    prefix: '!'
};