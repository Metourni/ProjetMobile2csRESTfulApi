'use strict';


const express = require('express');
const router = express.Router();

const ResturantController = require('../controllers/RestaurantController');


router.get('/', ResturantController.get_all_restaurants);

router.get('/:restaurant_id', ResturantController.get_restaurant_by_id);

router.get('/page/:index', ResturantController.get_all_restaurants_per_page);

router.delete('/:restaurant_id', ResturantController.delete_restaurant_by_id);

router.post('/', ResturantController.add_restaurant);

router.patch('/:restaurant_id', ResturantController.update_restaurant);


module.exports = router;
