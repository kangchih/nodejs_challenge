const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const auth = require('../auth/third-party');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const config = require('../config.json');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: config.sendgrid_key
        }
    })
);

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;

        const saltRounds = 10;
        const hashedPw = await bcrypt.hash(password, saltRounds);

        const user = new User({
            email: email,
            password: hashedPw,
            name: name
        });

        const result = await user.save();

        let coupon = await Coupon.findOne({ title: "SIGNUP_COUPON" });
        if (!coupon) {
            const newCoupon = new Coupon({
                title: "SIGNUP_COUPON",
                code: "SIGNUP_DISCOUNT"
            });
            coupon = await newCoupon.save();
        }
        user.addCoupon(coupon);

        await transporter.sendMail({
            to: email,
            from: config.email_from,
            subject: 'Register Success',
            html: '<h1>You successfully signed up!</h1>'
        });

        res.status(201).json({ userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.data = err.message;
        }
        next(err);
    }
};

exports.thirdPartySignup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed.');
            error.statusCode = 422;
            error.data = errors.array();
            throw error;
        }
        const provider = req.body.provider;
        const token = req.body.token;

        const { email, name } = await auth.getUserInfoFromToken(provider, token);
        const userDoc = await User.findOne({ email: email });
        if (userDoc) {
            res.status(201).json({ userId: userDoc._id });
        } else {
            const user = new User({
                email: email,
                name: name
            });

            const result = await user.save();

            let coupon = await Coupon.findOne({ title: "SIGNUP_COUPON" });
            if (!coupon) {
                const newCoupon = new Coupon({
                    title: "SIGNUP_COUPON",
                    code: "SIGNUP_DISCOUNT"
                });
                coupon = await newCoupon.save();
            }
            user.addCoupon(coupon);

            await transporter.sendMail({
                to: email,
                from: config.email_from,
                subject: 'Register Success',
                html: '<h1>You successfully signed up!</h1>'
            });

            res.status(201).json({ userId: result._id });
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.data = err.message;
        }
        next(err);
    }
};