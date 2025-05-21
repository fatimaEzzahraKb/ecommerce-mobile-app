var express = require('express');
const { addCategory, getCategories, updateCategory, deleteCategory, showCategory } = require('../controllers/CategoryController');
var router = express.Router();

/* GET users listing. */

router.get('/',getCategories);
router.post('/',addCategory);
router.put('/:id',updateCategory);
router.get('/:id',showCategory);
router.delete('/:id',deleteCategory);
module.exports = router;
