"use strict";

const express = require('express');
const router = express.Router();


const categoryController = require('../controllers/CategoryController');
const authMiddelware = require('../middleware/auth');

router.get('/', categoryController.get_all_categories);

router.post('/add-to-fav', authMiddelware, categoryController.add_category_to_fav);

router.get('/menujour/:menujour_id', categoryController.get_category_by_menujour_id);

module.exports = router;