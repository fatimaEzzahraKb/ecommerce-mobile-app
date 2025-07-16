var express = require('express');
const { addBook, getBooks, deleteBook, updateBook } = require('../controllers/BookController');
const upload = require('../middlewares/upload');
const { startScan, storeCopy, endScan, supprimerExemplaire, getHistory } = require('../controllers/CopiesController');
var router = express.Router();

router.post('/',upload.single('image'),addBook);
router.get('/',getBooks);
router.get('/history',getHistory);
router.delete('/:id',deleteBook);
router.put('/:id',upload.single('image'),updateBook);
router.post('/start-scan',startScan);
router.post('/end-scan',endScan);
router.post('/stocker-exemplaire',storeCopy); 
router.post('/supprimer-exemplaire', supprimerExemplaire);


module.exports = router;

