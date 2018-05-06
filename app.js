const
    express = require('express'),
    app = express(),
    restaurantRoutes = require('./api/routes/RestaurantRoute'),
    dishRoutes = require('./api/routes/DishRoute'),
    morgan = require('morgan'),
    bodyParser = require('body-parser');


/** Use the routers in the api to handel the requests */
// Mogran it use for log all request
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

// Routing
app.use('/restaurants', restaurantRoutes);
app.use('/dishes', dishRoutes);


/** Handel Errors */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;