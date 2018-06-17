const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

/** Router */
const restaurantRoutes = require('./api/routes/RestaurantRoute');
const dishRoutes = require('./api/routes/DishRoute');
const platBinaireRoute = require('./api/routes/PlatBinaireRoute');



app.use(morgan('dev'));// To log all request
app.use(bodyParser.urlencoded({extended: false}));// for parsing application/x-www-form-urlencoded
app.use(bodyParser.json());// for parsing application/json
app.use(express.static('public'));

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin , Content-Type, X-Requested-With , Accept, Authorization"
    );
    if (req.methode === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "POST, PUT, PATCH, DELETE,GET"
        );
        return res.status(200).json({});
    }
    next();
});

/** Use the routers in the api to handel the requests */
app.use('/restaurants', restaurantRoutes);
app.use('/dishes', dishRoutes);
app.use('/platBinaire',platBinaireRoute);


/** Handel Errors */
//If we arrived in this section that's mean we don't find a route for the request so we show 404 error.
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
//Handel All errors set as default 500.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;