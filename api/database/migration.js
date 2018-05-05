'use strict';


const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    port: "8889",
    database: 'projet_mobile',
    user: "root",
    password: "root"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql =
        "CREATE TABLE restaurants " +
        "(" +
        "   id INT AUTO_INCREMENT PRIMARY KEY," +
        "   name VARCHAR(255), " +
        "   address VARCHAR(255)" +
        ")";


    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});