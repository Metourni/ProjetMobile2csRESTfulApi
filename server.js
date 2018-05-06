'use strict';


const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port);
console.log('Restaurant RESTful API server started on : ' + port);


/*
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    //mongoose = require('mongoose'),
    Restaurant = require('./api/models/RestaurantModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let routes = require('./api/routes/RestaurantRoute'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Restaurant RESTful API server started on : ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

*/