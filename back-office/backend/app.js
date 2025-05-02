var express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var path = require('path');

var app = express();
// DB
const { initDb } = require('./config/db');
initDb();

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies


// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categories');
var orderRouter = require('./routes/orders');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories',categoryRouter);
<<<<<<< HEAD
app.use('/books',bookRouter);
app.use('/cart',cartRouter);
app.use('/uploads', express.static('uploads'));

=======
app.use('/orders',orderRouter);
>>>>>>> 64c05858a97f7610d3bb32de1c852eaddce32ea2

module.exports = app;
