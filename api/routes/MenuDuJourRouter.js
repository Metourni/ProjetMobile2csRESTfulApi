'use strict';


const express = require('express');
const router = express.Router();

const menuDuJourController = require('../controllers/MenuDuJourController');


router.get("/", menuDuJourController.get_all_menu_day);

router.get("/restaurant/:restaurant_id", menuDuJourController.get_menu_day_by_restaurant);



// To use router out of this file (registering)
module.exports = router;