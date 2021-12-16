const { Router } = require('express');
const router = Router();
const { getAllCategories, getCategory } = require('../controllers/categories')

router.get('/', getAllCategories);
router.get('/:id', getCategory);

module.exports = router;