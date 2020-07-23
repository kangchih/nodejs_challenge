const { validationResult } = require('express-validator');

const Coupon = require('../models/coupon');

exports.createCoupon = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const coupon = new Coupon({
        title: req.body.title,
        code: req.body.code
    });
    try {
        await coupon.save();
        res.status(201).json({
            message: 'Coupon created successfully!',
            coupon: coupon
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};