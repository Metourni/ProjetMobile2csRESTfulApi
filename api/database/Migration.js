'use strict';


const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql =
        "CREATE TABLE IF NOT EXISTS restaurants " +
        "(" +
        "   restaurant_id INT AUTO_INCREMENT PRIMARY KEY," +
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
        console.log("Table restaurants created");
    });

    sql =
        "CREATE TABLE IF NOT EXISTS dishes " +
        "(" +
        "  dish_id INT AUTO_INCREMENT PRIMARY KEY," +
        "  name  varchar(255) NOT NULL," +
        "  rating  int(11) DEFAULT NULL," +
        "  image  varchar(255) DEFAULT NULL," +
        "  price  varchar(255) DEFAULT NULL," +
        "  restaurant_id  int(11) DEFAULT NULL," +
        "  category_id  int(11) DEFAULT NULL," +
        "  platbinaire_id  int(11) DEFAULT NULL," +
        "  menujour_id  int(11) DEFAULT NULL," +
        "  panier_id  int(11) DEFAULT NULL" +
        ")";


    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table dishes created");
    });
});