'use strict';


const express = require('express');
const router = express.Router();

const DishController = require('../controllers/DishController');
const authMiddelware = require('../middleware/auth');


router.get('/', DishController.get_all_dishes);

router.get('/:dish_id', DishController.get_dish_by_id);

router.get('/restaurant/:restaurant_id', DishController.get_dishes_by_restaurant);

router.get('/category/:category_id', DishController.get_dishes_by_category);

router.get('/restaurant-category/:restaurant_id/:category_id', DishController.get_dishes_by_restaurant_and_category);

router.delete('/:dish_id', authMiddelware, DishController.delete_dish_by_id);

router.post('/', authMiddelware, DishController.add_dish);

router.patch('/:dish_id', authMiddelware, DishController.update_dish);


// To use router out of this file (registering)
module.exports = router;

