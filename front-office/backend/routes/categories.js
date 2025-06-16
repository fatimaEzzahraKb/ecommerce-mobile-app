var express = require('express');
const {  getAllCategory, getCategoryBooks } = require('../controllers/CategoryController');
var router = express.Router();



router.get('/',getAllCategory);
router.get('/:id',getCategoryBooks);

module.exports = router;