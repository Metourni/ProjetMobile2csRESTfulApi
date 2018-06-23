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
                res.status(201).json(rows)
            } else {
                res.status(404).json({
                    message: "Dishes not found"
                })
            }
        }
    })
};

exports.get_dish_by_id = (req, res) => {
    const dish_id = req.params.dish_id;
    const dish = new Dish();

    dish.find('first', {where: 'dish_id = ' + dish_id}, (error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            if (rows) {
                res.status(201).json(rows)
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
                res.status(201).json(rows);
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
                res.status(201).json(rows)
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
                    res.status(201).json(rows)
                } else {
                    res.status(404).json({
                        message: "Dishes not found"
                    })
                }
            }
        }
    )
};

exports.get_dishes_by_menu_du_jour = (req, res) => {
    const dish = new Dish();
    const menujour_id = req.params.menujour_id;
    dish.find(
        'all',
        {where: "menujour_id = " + menujour_id},
        (error, rows) => {
            if (error) {
                res.status(500).json({
                    error: error
                })
            } else {
                if (rows) {
                    res.status(201).json(rows)
                } else {
                    res.status(404).json({
                        message: "Dishes not found"
                    })
                }
            }
        }
    )
};

exports.get_dishes_by_plat_binaire = (req, res) => {
    const dish = new Dish();
    const platbinaire_id = req.params.platbinaire_id;
    dish.find(
        'all',
        {where: "platbinaire_id = " + platbinaire_id},
        (error, rows) => {
            if (error) {
                res.status(500).json({
                    error: error
                })
            } else {
                if (rows) {
                    res.status(201).json(rows)
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

exports.update_dish = (req, res) => {
    const dish = new Dish();
    const dish_id = req.params.dish_id;

    let q = "UPDATE dishes SET ";
    const body = req.body;
    for (const ops in body) {
        //TODO ; complet the table...
        if (["category_id", "menujour_id", "name"].includes(ops)) {
            q += ops + " = '" + body[ops] + "' ,";
        }
    }
    q = q.slice(0, (q.length - 1));
    q += " WHERE dish_id = " + dish_id;

    dish.query(q, (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else {
            console.log(rows);
            if (rows.changedRows >= 1) {
                res.status(201).json({
                    response: true
                });
            } else {
                res.status(404).json({
                    message: "Dish not found"
                })
            }

        }
    });
};

exports.add_dish = (req, res) => {
    const newDish = {
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        restaurant_id: req.body.restaurant_id,
        category_id: req.body.category_id,
        platbinaire_id: req.body.platbinaire_id,
        menujour_id: req.body.menujour_id,
        panier_id: req.body.panier_id,
        image: process.env.APP_URL + ":" + process.env.APP_PORT + "/" + req.file.path,
    };

    const dish = new Dish(newDish);
    dish.save(function (err, rows) {
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
                    message: "not found"
                });
            }
        }
    });
};
