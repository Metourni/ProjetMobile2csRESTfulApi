'use strict';


const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Get"
    })
});

router.get('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    console.log(id);
    res.status(200).json({
        id: "your id is : " + id
    })
});

router.post('/', (req, res, next) => {
    const restaurant = {
        //body Parser allow us to use attr 'body'
        name: req.body.name,
        id : 1
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