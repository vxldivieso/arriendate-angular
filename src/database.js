const mysql = require('mysql');

const db = mysql.createConnection({
    host:'turismoreal.mysql.database.azure.com',
    user:'userTurismo',
    password:'Admin12345',
    database:'bdturismoreal'
});

module.exports = db