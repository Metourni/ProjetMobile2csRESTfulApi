"use strict";

const mysqlModel = require('mysql-model');
require('dotenv').config();


const MyAppModel = mysqlModel.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});

let Category = MyAppModel.extend({
    tableName: "categories"
});


module.exports = Category;

