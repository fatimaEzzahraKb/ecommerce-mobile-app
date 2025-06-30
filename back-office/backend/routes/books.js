var express = require('express');
const { addBook, getBooks, deleteBook, updateBook } = require('../controllers/BookController');
const upload = require('../middlewares/upload');
const { startScan } = require('../controllers/CopiesController');
var router = express.Router();

router.post('/',upload.single('image'),addBook);
router.get('/',getBooks);
router.delete('/:id',deleteBook);
router.put('/:id',upload.single('image'),updateBook);
router.post('/start-scan',startScan);
module.exports = router;

