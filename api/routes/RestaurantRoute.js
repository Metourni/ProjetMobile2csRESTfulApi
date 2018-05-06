'use strict';


const express = require('express');
const router = express.Router();
//const db = require('../dal/DBConnection');
const Restaurant = require('../models/Restaurant')


router.get('/', (req, res, next) => {
    let restaurant = new Restaurant();
    restaurant.find('all', (err, rows, fields) => {
        console.log(fields);
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    restaurant: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });
});

// TODO : Pagination
router.get('/page/:index', (req, res, next) => {
    const i = req.params.index;

    let restaurant = new Restaurant();
    restaurant.find('all', {where:"id" ,limit: [0, 30]}, (err, rows, fields) => {
        console.log(fields);
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    restaurant: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });
});


router.get('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    let restaurant = new Restaurant();
    restaurant.find('all', {where: "id = " + id}, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    restaurant: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });

});

router.post('/', (req, res, next) => {
    const rest = {
        //body Parser allow us to use attr 'body'
        name: req.body.name,
    };

    let restaurant = new Restaurant(rest);
    restaurant.save(function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    restaurant: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });
});


router.patch('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    res.status(200).json({
        id: "updated id is : " + id
    })
});

router.delete('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    let restaurant = new Restaurant();
    restaurant.remove({where: "id = " + id}, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    restaurant: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });

});

module.exports = router;

/*
module.exports = function (app) {
    let restaurantCtrl = require('../controllers/RestaurantController');

    // todoList Routes
    app.route('/')
        .get(restaurantCtrl.get_all_restaurant);


    //app.route('/restaurant/:restaurant_id')
      //  .get(restaurantCtrl.find_restaurant);
    //.put(restaurantCtrl.)
    //.delete(restaurantCtrl.);
};
*/