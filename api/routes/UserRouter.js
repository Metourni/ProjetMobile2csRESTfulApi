'use strict';


const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

require('dotenv').config();


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            const date = new Date();
            const currentDate =
                date.getFullYear() + "-" +
                date.getMonth() + "-" +
                date.getDate() + " " +
                date.getHours() + ":" +
                date.getMinutes() + ":" +
                date.getSeconds()
            ;
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                remember_token: req.body.remember_token,
                created_at: currentDate,
                updated_at: currentDate
            });
            user.save((error, rows) => {
                if (error) {
                    res.status(500).json({
                        error: error
                    });
                }
                else {
                    if (rows) {
                        res.status(201).json({
                            user: {
                                name: user.name,
                                email: user.email
                            }
                        });
                    } else {
                        res.status(404).json({
                            message: "Restaurant not found"
                        });
                    }
                }
            });
        }
    })
});

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(email);
    let user = new User();
    user.find('first', {where: "email = '" + email + "'"}, function (err, rows, fields) {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            if (rows) {
                bcrypt.compare(password, rows.password, (error, result) => {
                    if (error) {
                        return res.status(401).json({
                            message: "Bad password"
                        });
                    } else {
                        if (result) {
                            const token = jwt.sign(
                                {
                                    id: rows.id,
                                    email: rows.email,
                                    name: rows.name
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn:"1h"
                                }
                            );
                            res.status(201).json({
                                user: {
                                    name : rows.name,
                                    email : rows.email,
                                    token :  token
                                }
                            });
                        } else {
                            return res.status(401).json({
                                message: "Bad password"
                            });
                        }
                    }
                })
            } else {
                res.status(404).json({
                    message: "Restaurant not found"
                });
            }
        }
    });
});


module.exports = router;
