require('custom-env').env();
let database;
const firebase = require('firebase');
const firebaseConfig = {
    apiKey: process.env.FBKEY,
    authDomain: "project-808507223458.firebaseapp.com",
    databaseURL: "https://d2bot-14a14.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
};

firebase.initializeApp(firebaseConfig);
database = firebase.database();

module.exports = {
    database: database,
    discordToken: process.env.DAKEY,
    activeBotToken: process.env.DBKEY,
    prefix: '!',
    channels: {
        production: '505098970616299541',
        alfa: '589613917899063346',
        dev:'586451986585485323'
    }
};