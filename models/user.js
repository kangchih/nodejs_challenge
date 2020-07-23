const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  coupons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Coupon'
    }
  ]
});


userSchema.methods.addCoupon = function (coupon) {
  if (coupon.id){
    this.coupons.push(coupon._id);
  }
  return this.save();
}

module.exports = mongoose.model('User', userSchema);