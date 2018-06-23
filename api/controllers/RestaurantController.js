'use strict';

const Restaurant = require('../models/Restaurant');
const validator = require('validator');

const Paginator = 2;

exports.get_all_restaurants = (req, res) => {
    const restaurant = new Restaurant();
    restaurant.find('all', (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json(rows);
            } else {
                res.status(404).json({
                    message: "Restaurants not found"
                });
            }
        }
    });
};

exports.get_restaurant_by_id = (req, res) => {
    const restaurant_id = req.params.restaurant_id;
    const restaurant = new Restaurant();
    restaurant.find('first', {where: "restaurant_id = " + restaurant_id}, function (err, rows) {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json(rows);
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });

};

exports.get_all_restaurants_per_page = (req, res) => {
    let i = 1;
    if (req.params.index)
        i = req.params.index;

    let _start = (i * Paginator) - Paginator; // _start > 0
    let _end = i * Paginator; // _end =< count

    if (_start <= 0)
        _start = 0;

    const restaurant = new Restaurant();
    //*TODO: change the logic using limit*/
    restaurant.find('all', {where: "restaurant_id > " + _start + " and restaurant_id <= " + _end}, (err, rows, fields) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    restaurant: rows
                });
            } else {
                res.status(404).json({
                    message: "Restaurants not found"
                });
            }
        }
    });
};

exports.delete_restaurant_by_id = (req, res) => {
    const restaurant = new Restaurant();
    const restaurant_id = req.params.restaurant_id;
    restaurant.remove('restaurant_id = ' + restaurant_id, (error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            console.log(rows.affectedRows);
            if (rows.affectedRows >= 1) {
                res.status(201).json({
                    message: "Successfully deleted"
                })
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                })
            }
        }
    });
};

exports.update_restaurant = (req, res) => {

    const restaurant = new Restaurant();
    const restaurant_id = req.params.restaurant_id;

    let q = "UPDATE restaurants SET ";
    const body = req.body;
    for (const ops in body) {
        //TODO ; complet the table
        if (["address", "dateFerm", "facebook"].includes(ops)) {
            q += ops + " = '" + body[ops] + "' ,";
        }
    }
    q = q.slice(0, (q.length - 1));
    q += " WHERE restaurant_id = " + restaurant_id;

    restaurant.query(q, (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else {
            if (rows.changedRows >= 1) {
                res.status(201).json({
                    response: true
                });
            } else {
                res.status(404).json({
                    message: "Restaurant dish not found"
                })
            }

        }
    });
};

exports.get_restaurant_with_dishes_by_id = (req, res) => {
    const restaurant = new Restaurant();
    const restaurant_id = req.params.restaurant_id;
    restaurant.find('first', {where: "restaurant_id = " + restaurant_id}, (err, rows) => {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else {
                console.log(rows.length);
                if (rows) {
                    let q = "SELECT dishes.* " +
                        "FROM restaurants JOIN dishes " +
                        "ON restaurants.restaurant_id = dishes.restaurant_id " +
                        "WHERE restaurants.restaurant_id = " + restaurant_id;
                    restaurant.query(q, (err, rows_dishes) => {
                        if (err) {
                            res.status(500).json({
                                error: err
                            });
                        } else {
                            if (rows_dishes) {
                                rows.dishes = rows_dishes;
                                res.status(201).json({
                                    restaurant: rows
                                });
                            } else {
                                res.status(201).json({
                                    restaurant: rows
                                });
                            }

                        }
                    });
                }
                else {
                    res.status(404).json({
                        message: "Restaurant dish not found"
                    })
                }

            }
        }
    );
};

/* TODO : Make method corps */
exports.add_restaurant = (req, res) => {
    const newRestaurant = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        localisation: req.body.localisation,
        email: req.body.email,
        address: req.body.address,
        description: req.body.description,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        rating: req.body.rating,
        nbTable: req.body.nbTable,
        dateOuv: req.body.dateOuv,
        dateFerm: req.body.dateFerm,
        image: process.env.APP_URL + ":" + process.env.APP_PORT + "/" + req.file.path,
    };

    const restaurant = new Restaurant(newRestaurant);
    restaurant.save(function (err, rows) {
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
                        url: process.env.APP_URL + ":" + process.env.APP_PORT + "/restaurants/" + rows.insertId
                    }
                });
            } else {
                res.status(404).json({
                    message: "not found"
                });
            }
        }
    });
};


