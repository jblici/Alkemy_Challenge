const { Router } = require('express');
const router = Router();
const { getAllOperations, getOperation, insertOperation } = require('../controllers/operations')

router.get('/:userId', getAllOperations);
router.get('/:userId/:id', getOperation);
router.post('/create', insertOperation);

module.exports = router;