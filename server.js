'use strict';


const http = require('http');
const app = require('./app');
const port = process.env.APP_PORT || 3000;
const server = http.createServer(app);
require('dotenv').config();


server.listen(port);
console.log('The app : ' + process.env.APP_NAME + ' RESTful API server started on : ' + port);

