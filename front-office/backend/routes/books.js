var express = require('express');
const { getAllBooks, showBook, searchBookByTitle } = require('../controllers/BookController');
var router = express.Router();



router.get('/',getAllBooks);
router.get('/:id',showBook);
router.get('/search/:title',searchBookByTitle);


module.exports = router;