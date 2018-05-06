"use strict";

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "8889",
    database: 'projet_mobile',
    user: "root",
    password: "root"
});

connection.connect(function (err) {
    if (err)
        throw err;
    else
        console.log("Connected!");
});

/*
function query(sql) {
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    });
}*/
module.exports = connection;