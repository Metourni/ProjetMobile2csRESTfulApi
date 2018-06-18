'use strict';

const Dish = require('../models/Dish');

const Paginator = 2;
require('dotenv').config();


exports.get_all_dishes = (req, res, next) => {
    const dish = new Dish();

    dish.find('all', (err, rows, fields) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            if (rows) {
                res.status(201).json({
                    dishes: rows
                })
            } else {
                res.status(404).json({
                    message: "Dishes not found"
                })
            }
        }
    })
};

exports.get_dish_by_id = (req, res) => {
    const dish_id = req.param.dish_id;
    const dish = new Dish();

    dish.find('first', {where: 'dish_id = ' + dish_id}, (error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            if (rows) {
                res.status(201).json({
                    dishes: rows
                })
            } else {
                res.status(404).json({
                    message: "Dish not found"
                })
            }
        }
    })
};

exports.get_dishes_by_restaurant = (req, res, next) => {
    const dish = new Dish();
    const restaurant_id = req.params.restaurant_id;
    dish.find('all', {where: "restaurant_id = " + restaurant_id}, (error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            if (rows) {
                res.status(201).json({
                    dishes: rows
                })
            } else {
                res.status(404).json({
                    message: "Dishes not found"
                })
            }
        }
    })
};

exports.get_dishes_by_category = (req, res) => {
    const dish = new Dish();
    const category_id = req.params.category_id;
    dish.find('all', {where: "category_id = " + category_id}, (error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            if (rows) {
                res.status(201).json({
                    dishes: rows
                })
            } else {
                res.status(404).json({
                    message: "Dishes not found"
                })
            }
        }
    })
};

exports.get_dishes_by_restaurant_and_category = (req, res) => {
    const dish = new Dish();
    const category_id = req.params.category_id;
    const restaurant_id = req.params.restaurant_id;
    dish.find(
        'all',
        {where: "category_id = " + category_id + " AND restaurant_id = " + restaurant_id},
        (error, rows) => {
            if (error) {
                res.status(500).json({
                    error: error
                })
            } else {
                if (rows) {
                    res.status(201).json({
                        dishes: rows
                    })
                } else {
                    res.status(404).json({
                        message: "Dishes not found"
                    })
                }
            }
        }
    )
};

exports.delete_dish_by_id = (req, res) => {
    const dish = new Dish();
    const dish_id = req.params.dish_id;
    dish.remove('dish_id = ' + dish_id, (error, rows) => {
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
                    message: "Dish not found"
                })
            }
        }
    });
};

/* TODO : Make method corps */
exports.add_dish = (req, res) => {
    const dish = new Dish();
    const newDish = {};

    res.status(300).json({
        message: "Under construction"
    })
};

/* TODO : Make method corps */
exports.update_dish = (req, res) => {
    const dish = new Dish();
    const newDish = {};

    res.status(300).json({
        message: "Under construction"
    })
};