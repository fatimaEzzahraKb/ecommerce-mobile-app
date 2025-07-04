var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var booksRouter = require("./routes/books");
var categoriesRouter = require("./routes/categories");
var cartRouter = require("./routes/cartItems");
var ordersRouter = require("./routes/orders");
var paymentRouter = require("./routes/payment");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authentication', authRouter);
app.use('/books',booksRouter);
app.use('/categories',categoriesRouter);
app.use('/cart',cartRouter);
app.use('/orders',ordersRouter);
app.use('/payments',paymentRouter);

app.listen(5000, '0.0.0.0', () => {
  console.log("Server running on http://0.0.0.0:5000");
});

module.exports = app;
