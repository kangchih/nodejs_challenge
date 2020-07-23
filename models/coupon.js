const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Coupon', couponSchema);