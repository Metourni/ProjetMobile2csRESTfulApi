"use strict";

const mysqlModel = require('mysql-model');

const MyAppModel = mysqlModel.createConnection({
    host: "127.0.0.1",
    port: "8889",
    database: 'projet_mobile',
    user: "root",
    password: "root"

});

let Restaurant = MyAppModel.extend({
    tableName: "restaurants"
});


module.exports = Restaurant;

