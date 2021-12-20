const { Router } = require('express');
const router = Router();
const { getAllOperations, getOperation, insertOperation } = require('../controllers/operations')

router.get('/', getAllOperations);
router.get('/:id', getOperation);
router.post('/create', insertOperation);

module.exports = router;