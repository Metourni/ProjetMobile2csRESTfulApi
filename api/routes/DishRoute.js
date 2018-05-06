'use strict';


const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Get"
    })
});
router.get('/:dishId', (req, res, next) => {
    const id = req.params.restaurantId;
    console.log(id);
    res.status(200).json({
        id: "your id is : " + id
    })
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message : "Post"
    })
});

router.patch('/:dishId', (req, res, next) => {
    const id = req.params.restaurantId;
    res.status(200).json({
        id: "updated id is : " + id
    })
});

router.delete('/:dishId', (req, res, next) => {
    const id = req.params.restaurantId;
    res.status(200).json({
        id: "deleted id is : " + id
    })
});

// To use router out of this file (registering)
module.exports = router;

