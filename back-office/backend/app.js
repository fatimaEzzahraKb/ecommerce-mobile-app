var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var app = express();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categories');
var bookRouter = require('./routes/books');
var cartRouter = require('./routes/cartItems');
var orderRouter = require('./routes/orders');
require('./models/Category.model');
const { initDb } = require('./config/db');


initDb();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories',categoryRouter);

app.use('/books',bookRouter);
app.use('/cart',cartRouter);
app.use('/uploads', express.static('uploads'));


app.use('/orders',orderRouter);


module.exports = app;
