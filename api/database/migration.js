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
        "   phoneNumber VARCHAR(255), " +
        "   localisation VARCHAR(255), " +
        "   email VARCHAR(255), " +
        "   address VARCHAR(255), " +
        "   description VARCHAR(1024), " +
        "   facebook VARCHAR(255), " +
        "   twitter VARCHAR(255), " +
        "   rating INTEGER(11), " +
        "   nbTable INTEGER(11), " +
        "   dateOuv datetime, " +
        "   dateFerm datetime, " +
        "   image VARCHAR(255) " +
        ")";


    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});