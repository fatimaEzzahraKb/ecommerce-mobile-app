var express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var path = require('path');

var app = express();

const { initDb, sequelize } = require('./config/db');
// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categories');
var bookRouter = require('./routes/books');
var cartRouter = require('./routes/cartItems');
var orderRouter = require('./routes/orders');
var dashboardRouter = require("./routes/dashboard");

require('./models/Category.model');

// DB

initDb();

// sequelize.sync({ alter: true });


// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json()); 





app.use('/', indexRouter);
app.use("/dashboard",dashboardRouter);
app.use('/users', usersRouter);
app.use('/categories',categoryRouter);

app.use('/books',bookRouter);
app.use('/cart',cartRouter);
app.use('/uploads', express.static('uploads'));


app.use('/orders',orderRouter);




module.exports = app;
