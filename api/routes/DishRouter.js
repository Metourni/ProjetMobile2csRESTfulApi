'use strict';


const express = require('express');
const router = express.Router();

const DishController = require('../controllers/DishController');
const authMiddelware = require('../middleware/auth');
/** File Handling and storing */
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/dishes/');
    },
    filename: function (req, file, callback) {
        let min = 1, max = 3000;
        min = Math.ceil(min);
        max = Math.floor(max);
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        const fileExtension = ((file.mimetype).split('/'))[1];
        callback(null, new Date().getTime() + random + "." + fileExtension);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        callback(null, true);//accept file.
    else
        callback(null, false);//reject file.
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter

});


router.get('/', DishController.get_all_dishes);

router.get('/:dish_id', DishController.get_dish_by_id);

router.get('/restaurant/:restaurant_id', DishController.get_dishes_by_restaurant);

router.get('/category/:category_id', DishController.get_dishes_by_category);

router.get('/restaurant-category/:restaurant_id/:category_id', DishController.get_dishes_by_restaurant_and_category);

router.get('/menujour/:menujour_id', DishController.get_dishes_by_menu_du_jour);

router.get('/platBinaire/:platbinaire_id', DishController.get_dishes_by_plat_binaire);

router.delete('/:dish_id', authMiddelware, DishController.delete_dish_by_id);

router.post('/', upload.single('img'), authMiddelware, DishController.add_dish);

router.patch('/:dish_id', authMiddelware, DishController.update_dish);


// To use router out of this file (registering)
module.exports = router;

