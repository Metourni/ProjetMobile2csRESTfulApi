'use strict';


const express = require('express');
const router = express.Router();

const ResturantController = require('../controllers/RestaurantController');
/** File Handling and storing */
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/restaurants/');
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


router.get('/', ResturantController.get_all_restaurants);

router.get('/:restaurant_id', ResturantController.get_restaurant_by_id);

router.get('/dishes/:restaurant_id', ResturantController.get_restaurant_with_dishes_by_id);

router.get('/page/:index', ResturantController.get_all_restaurants_per_page);

router.delete('/:restaurant_id', ResturantController.delete_restaurant_by_id);

router.post('/', upload.single('img'), ResturantController.add_restaurant);

router.patch('/:restaurant_id', ResturantController.update_restaurant);


module.exports = router;
