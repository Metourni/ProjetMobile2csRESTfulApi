'use strict';


const PlatBinaire = require('../models/PlatBinaire');

const Paginator = 2;
require('dotenv').config();

exports.get_all_binary_dishes = (req, res) => {
    const platBinaire = new PlatBinaire();
    platBinaire.find('all', (err, rows) => {
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
                    message: "Binary dishes not found"
                });
            }
        }
    });
};

exports.get_all_binary_dishes_per_page = (req, res) => {
    let i = 1;
    if (req.params.index)
        i = req.params.index;

    let _start = (i * Paginator) - Paginator; // _start > 0
    let _end = i * Paginator; // _end =< count

    if (_start <= 0)
        _start = 0;

    console.log('_start ' + _start + ' _end ' + _end);
    const platBinaire = new PlatBinaire();
    //*TODO: change the logic using limit*/
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
                    message: "Binary dishes not found"
                });
            }
        }
    });
};

exports.get_binary_dish_by_id = (req, res) => {
    const platbinaire_id = req.params.platbinaire_id;
    const platBinaire = new PlatBinaire();
    platBinaire.find('first', {where: "platbinaire_id = " + platbinaire_id}, function (err, rows) {
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
                    message: "Binary dish not found"
                });
            }
        }
    });

};

exports.add_binary_dish = (req, res) => {
    const newPlatBinaire = {
        //body Parser allow us to use attr 'body'
        nomPlat: req.body.nomPlat,
        new_price: req.body.new_price,
        image: process.env.APP_URL + ":" + process.env.APP_PORT + "/" + req.file.path,
        restaurant_id: req.body.restaurant_id,
        category_id: req.body.category_id
    };

    let platBinaire = new PlatBinaire(newPlatBinaire);
    platBinaire.save(function (err, rows) {
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
                    message: "Binary dish not found"
                });
            }
        }
    });
};

exports.delete_binary_dish_by_id = (req, res) => {
    const platBinaire = new PlatBinaire();
    const platbinaire_id = req.params.platbinaire_id;
    platBinaire.remove('platbinaire_id = ' + platbinaire_id, (error, rows) => {
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
                    message: "Binary dish not found"
                })
            }
        }
    });
};

exports.update_binary_dish = (req, res) => {
    let q = "UPDATE plat_binaire SET ";
    const platbinaire_id = req.params.platbinaire_id;
    const body = req.body;
    for (const ops in body) {
        if (["nomPlat", "new_price"].includes(ops)) {
            q += ops + " = '" + body[ops] + "' ,";
        }
    }
    q = q.slice(0, (q.length - 1));
    q += " WHERE platbinaire_id = " + platbinaire_id;
    const platBinaire = new PlatBinaire();
    platBinaire.query(q, (err, rows) => {
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
                    message: "Binary dish not found"
                })
            }

        }
    });
};



