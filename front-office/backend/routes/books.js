var express = require('express');
const { getAllBooks, showBook } = require('../controllers/BookController');
var router = express.Router();



router.get('/',getAllBooks);
router.get('/:id',showBook);

module.exports = router;