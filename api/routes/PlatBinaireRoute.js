'use strict';


const express = require('express');
const router = express.Router();
const PlatBinaire = require('../models/PlatBinaire');

/** File Handling and storing */
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images/plat_binaire/');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
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

const Paginator = 2;
require('dotenv').config();


router.get('/', (req, res, next) => {
    let platBinaire = new PlatBinaire();
    platBinaire.find('all', (err, rows, fields) => {
        //console.log(fields);
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    platBinaire: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });
});

router.get('/page/:index', (req, res, next) => {
    let i = 1;
    if (req.params.index)
        i = req.params.index;

    let _start = (i * Paginator) - Paginator; // _start > 0
    let _end = i * Paginator; // _end =< count

    if (_start <= 0)
        _start = 0;

    console.log('_start ' + _start + ' _end ' + _end);
    let platBinaire = new PlatBinaire();
    platBinaire.find('all', {where: "platbinaire_id > " + _start + " and platbinaire_id <= " + _end}, (err, rows, fields) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    platBinaire: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });
});

router.get('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    let platBinaire = new PlatBinaire();
    platBinaire.find('first', {where: "platbinaire_id = " + id}, function (err, rows, fields) {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    platBinaire: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });

});

router.post('/', upload.single('img'), authMiddelware, (req, res, next) => {
    const newPlatBinaire = {
        //body Parser allow us to use attr 'body'
        nomPlat: req.body.nomPlat,
        new_price: req.body.new_price,
        image: process.env.APP_URL + ":" + process.env.APP_PORT + "/" + req.file.path,
        restaurant_id: req.body.restaurant_id,
        category_id: req.body.category_id
    };

    let platBinaire = new PlatBinaire(newPlatBinaire);
    platBinaire.save(function (err, rows, fields) {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    platBinaire: {
                        platBinaire: platBinaire,
                        url: process.env.APP_URL + ":" + process.env.APP_PORT + "/platBinaire/" + rows.insertId
                    }
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });
});


//TODO: Update restaurant.
router.patch('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    const newRestaurant = {};
    let restaurant = new Restaurant();
    restaurant.find('first', {where: "restaurant_id = " + id}, (err, rows, fields) => {
        if (err) {
            console.log("err : " + err);
            res.status(500).json({
                error: err
            });
        } else {
            for (const ops of req.body) {
                newRestaurant[ops.propertyName] = ops.value;
                restaurant.set(ops.propertyName, ops.value);
            }
            restaurant.save();
            res.status(201).json({
                response: true
            });
        }
    })
});

router.delete('/:restaurantId', (req, res, next) => {
    const id = req.params.restaurantId;
    let restaurant = new Restaurant();
    restaurant.remove({where: "restaurant_id = " + id}, function (err, rows, fields) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    message: "Successful deleted."
                });
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });

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