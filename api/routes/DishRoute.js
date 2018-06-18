'use strict';


const express = require('express');
const router = express.Router();

const DishController = require('../controllers/DishController');
const authMiddelware = require('../middleware/auth');


router.get('/', DishController.get_all_dishes);

router.get('/:dish_id', DishController.get_dishes_by_id);

router.get('/restaurant/:restaurant_id', DishController.get_dishes_by_restaurant);

router.get('/category/:category_id', DishController.get_dishes_by_category);

router.get('/restaurant-category/:restaurant_id/:category_id', DishController.get_dishes_by_restaurant_and_category);

router.delete('/:dish_id', authMiddelware, DishController.delete_dishes_by_id);

/* TODO : Make in controller */
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Post"
    })
});

router.patch('/:dishId', (req, res, next) => {
    const id = req.params.restaurantId;
    res.status(200).json({
        id: "updated id is : " + id
    })
});


// To use router out of this file (registering)
module.exports = router;

