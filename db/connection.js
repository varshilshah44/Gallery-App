const config = require('../config/config');
const mongoose = require('mongoose');

const dbConnection = mongoose.createConnection(config.db.connectionString,config.db.options);

dbConnection.on('connected',() => {
    console.log("db connected successfully");
})

dbConnection.on('disconnected',() => {
    console.log("db connected successfully");
})

dbConnection.on('error', (err) => {
    console.log("db connection failes : " + err);
})

module.exports = dbConnection;
