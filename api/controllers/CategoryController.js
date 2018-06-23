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
                res.status(201).json(rows)
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

exports.get_category_by_menujour_id = (req, res) => {
    const menujour_id = req.params.menujour_id;
    const category = new Category();
    const q =
        "SELECT * " +
        "From categories c inner join menujour mj " +
        "ON c.category_id = mj.category_id " +
        "WHERE mj.menujour_id = " + menujour_id;
    category.query(q, (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else {
            if (rows) {
                res.status(201).json(rows);
            } else {
                res.status(404).json({
                    message: "Categories not found"
                })
            }

        }
    });

};
