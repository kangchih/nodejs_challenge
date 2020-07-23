const express = require('express');
const { body } = require('express-validator');

const couponController = require('../controllers/coupon');

const router = express.Router();

router.post(
  '/coupon',
  [
    body('title')
      .trim()
      .isLength({ min: 1 }),
    body('code')
      .trim()
      .isLength({ min: 1 })
  ],
  couponController.createCoupon
);

module.exports = router;