'use strict';


const mysql = require('mysql');

require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE projet_mobile", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
});

