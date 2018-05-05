'use strict';


const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    port: "8889",
    database: 'projet_mobile',
    user: "root",
    password: "root"
});

exports.get_all_restaurant = function (req, res) {

    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM restaurants", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });
};


exports.find_restaurant = function (req, res) {
    /*Task.find({}, function (err, task) {
        if (err)
            res.send(err);
        //res.json(task);
    });*/

    res.json({msg: "msg"});
};



