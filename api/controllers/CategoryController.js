"use strict";

const Category = require('../models/Category');
const FavCategory = require('../models/FavCategory');


exports.get_all_categories = (req, res) => {
    const category = new Category();
    category.find('all', (error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            if (rows) {
                res.status(201).json({
                    Categories: rows
                })
            } else {
                res.status(404).json({
                    message: "Categories not found"
                })
            }
        }
    });
};

exports.add_category_to_fav = (req, res) => {
    const fav = {
        category_id: req.body.category_id,
        user_id: req.body.userDecodedData.id
    };
    console.log(fav);

    const favCategory = new FavCategory(fav);

    favCategory.save((error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            })
        } else {
            if (rows) {
                res.status(201).json({
                    message: "Successfully added"
                })
            } else {
                res.status(404).json({
                    message: "Can't add"
                })
            }
        }
    });
};
