"use strict";

const OrderLine = require('../models/OrderLine');
const Order = require('../models/Order');

require('dotenv').config();


exports.get_all_orders = (req, res) => {
    const order = new Order();

    order.find('all', (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            if (rows) {
                res.status(201).json({
                    orders: rows
                })
            } else {
                res.status(404).json({
                    message: "Orders not found"
                })
            }
        }
    })
};

exports.get_order_by_id = (req, res) => {
    const order_id = req.params.order_id;
    const order = new Order();

    order.find('first', {where: "order_id = " + order_id}, (err, rows) => {
        if (err) {
            res.status(500).json({
                error: err
            })
        } else {
            if (rows) {
                res.status(201).json({
                    orders: rows
                })
            } else {
                res.status(404).json({
                    message: "Orders not found"
                })
            }
        }
    })
};

exports.delete_order_by_id = (req, res) => {
    const order_id = req.params.order_id;
    const order = new Order();

    order.remove('order_id = ' + order_id, (error, rows) => {
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
                    message: "Order not found"
                })
            }
        }
    });
};

exports.update_order = (req, res) => {

    const order_id = req.params.order_id;
    const order = new Order();

    let q = "UPDATE orders SET ";
    const body = req.body;
    for (const ops in body) {
        //TODO ; complet the table
        if (["restaurant_id", "user_id"].includes(ops)) {
            q += ops + " = '" + body[ops] + "' ,";
        }
    }
    q = q.slice(0, (q.length - 1));
    q += " WHERE order_id = " + order_id;

    order.query(q, (err, rows) => {
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
                    message: "No changed"
                })
            }

        }
    });
};

exports.get_full_order_by_id = (req, res) => {
    const order_id = req.params.order_id;
    const order = new Order();
    order.find('first', {where: "order_id = " + order_id}, (err, rows) => {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else {
                console.log(rows.length);
                if (rows) {
                    let q = "SELECT order_line.* " +
                        "FROM orders JOIN order_line " +
                        "ON order_line.order_id = orders.order_id " +
                        "WHERE order_line.order_id = " + order_id;
                    order.query(q, (err, lines_order) => {
                        if (err) {
                            res.status(500).json({
                                error: err
                            });
                        } else {
                            if (lines_order) {
                                rows.cmd = lines_order;
                                res.status(201).json({
                                    order: rows
                                });
                            } else {
                                res.status(201).json({
                                    order: rows
                                });
                            }

                        }
                    });
                }
                else {
                    res.status(404).json({
                        message: "Order not found"
                    })
                }

            }
        }
    );
};

exports.add_order = (req, res) => {
    const newOrder = {
        restaurant_id: req.body.restaurant_id,
        user_id: req.body.userDecodedData.id
    };

    const order = new Order(newOrder);

    order.save((error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    order: {
                        order: order,
                        url: process.env.APP_URL + ":" + process.env.APP_PORT + "/orders/" + rows.insertId
                    }
                });
            } else {
                res.status(404).json({
                    message: "error"
                });
            }
        }
    });
};

exports.add_line_to_order = (req, res) => {
    const line = {
        order_id: req.body.order_id,
        dish_id: req.body.dish_id,
        qte: req.body.qte
    };
    const orderLine = new OrderLine(line);
    orderLine.save((error, rows) => {
        if (error) {
            res.status(500).json({
                error: error
            });
        }
        else {
            if (rows) {
                res.status(201).json({
                    order: {
                        orderLine: orderLine,
                        url: process.env.APP_URL + ":" + process.env.APP_PORT + "/cmd/orders/" + line.order_id
                    }
                });
            } else {
                res.status(404).json({
                    message: "error"
                });
            }
        }
    });

};