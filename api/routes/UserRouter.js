'use strict';


const express = require('express');
const router = express.Router();

const User = require('../models/User');
const bcrypt = require('bcrypt');

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


module.exports = router;
