'use strict';


const express = require('express');
const router = express.Router();

/** File Handling and storing */
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/plat_binaire/');
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

const authMiddelware = require('../middleware/auth');

const PlatBinaireController = require('../controllers/PlatBinaireController');


router.get('/', PlatBinaireController.get_all_binary_dishes);

router.get('/:platbinaire_id', PlatBinaireController.get_binary_dish_by_id);

router.get('/page/:index', PlatBinaireController.get_all_binary_dishes_per_page);

router.post('/', upload.single('img'), authMiddelware, PlatBinaireController.add_binary_dish);

router.delete('/:platbinaire_id', authMiddelware, PlatBinaireController.delete_binary_dish_by_id);

router.patch('/:platbinaire_id', PlatBinaireController.update_binary_dish);


module.exports = router;
