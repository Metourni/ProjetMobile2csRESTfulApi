let express = require("express");
let mysql = require("mysql");
let app = express();

//database connection
let connection = mysql.createConnection({
    host: "127.0.0.1",
    port: "8889",
    database: 'tp_mobile',
    user: "root",
    password: "root"
});
connection.connect();


// server creation

let server = app.listen(8082, function () {
    let host = server.address().address
    let port = server.address().port
});

// rest service
app.get('/getPlayers', function (req, res) {
    let query = "select * from players";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});
// rest service
app.get('/getTeams', function (req, res) {
    let query = "select * from teams";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

// rest service
app.get('/getTeam/:name', function (req, res) {
    let query = "select * from team WHERE first_name= '" + req.params.name+ "'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

// rest service
app.get('/getPlayer/:name', function (req, res) {
    let query = "select * from players WHERE first_name= '" + req.params.name+ "'";
    connection.query(query, function (error, results) {
        if (error) throw error;
        res.send(JSON.stringify(results));
    })
});

