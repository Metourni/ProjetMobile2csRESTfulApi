

const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    port: "8889",
    database : 'projet_mobile',
    user: "root",
    password: "root"
});

con.connect(function (err) {
    if (err)
    //throw err;
        console.log("Error cnx!");
    else
        console.log("Connected!");
});


function query(sql) {
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            return result;
        });
    });
}