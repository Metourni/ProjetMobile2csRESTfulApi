'use strict';

const MenuDuJour = require('../models/MenuDuJour');

const Paginator = 2;
require('dotenv').config();

exports.get_all_menu_day = (req, res) => {
    const menuDuJour = new MenuDuJour();

    menuDuJour.find('all', (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            if (rows) {
                res.status(201).json({
                    menuDuJour: rows
                })
            } else {
                res.status(404).json({
                    message: "Menu du jour not found"
                })
            }
        }
    })
};

exports.get_menu_day_by_restaurant = (req, res) => {
    const menuDuJour = new MenuDuJour();
    const restaurant_id = req.params.restaurant_id;
    menuDuJour.find('all', {where: "restaurant_id = " + restaurant_id}, (error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            if (rows) {
                res.status(201).json({
                    menuDuJour: rows
                })
            } else {
                res.status(404).json({
                    message: "menuDuJour not found"
                })
            }
        }
    })
};