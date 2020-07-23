const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.json');
const authRoutes = require('./routes/auth');
const couponRoutes = require('./routes/coupon');

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use(couponRoutes);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ error: data });
});

mongoose
    .connect(
        config.mongo_connect
        , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));