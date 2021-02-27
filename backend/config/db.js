const mysql = require('mysql');
require('dotenv').config();

const sql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

sql.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connexion à la base de donnée réussie !');
});

module.exports = sql;