'use strict';


const express = require('express');
const router = express.Router();
//const db = require('../dal/DBConnection');
const Restaurant = require('../models/Restaurant')


router.get('/', (req, res, next) => {
    db.query('SELECT * FROM restaurants', function (err, result, fields) {
        if (err)
            throw err;
        console.log(result);

        res.status(200).json({
            restaurants: result
        });
        //return result;
    });

});

router.get('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    let restaurant = new Restaurant();
    let rss = restaurant.find();
    restaurant.find('all', {where: "id = " + id}, function (err, rows, fields) {
        if (err)
            console.log(err)
        else
            res.status(200).json({
                restaurant: rows
            });
    });


    res.status(200).json({
        msg: "get one" + rss
    });
});

router.post('/', (req, res, next) => {
    const restaurant = {
        //body Parser allow us to use attr 'body'
        name: req.body.name,
        id: 1
    };
    res.status(200).json({
        message: "Post",
        restaurant: restaurant
    })
});


router.patch('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    res.status(200).json({
        id: "updated id is : " + id
    })
});

router.delete('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    res.status(200).json({
        id: "deleted id is : " + id
    })
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