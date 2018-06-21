"use strict";

const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');
const authMiddelware = require('../middleware/auth');


router.get("/", orderController.get_all_orders);

router.get("/:order_id", orderController.get_order_by_id);

router.get("/cmd/:order_id", orderController.get_full_order_by_id);

router.post('/', authMiddelware, orderController.add_order);

router.delete('/:order_id', authMiddelware, orderController.delete_order_by_id);

router.patch('/:order_id', authMiddelware, orderController.update_order);

router.post('/add_order_line', authMiddelware, orderController.add_line_to_order);


module.exports = router;