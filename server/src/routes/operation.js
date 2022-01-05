const { Router } = require('express');
const router = Router();
const { getAllOperations, getOperation, insertOperation, editOperation, deleteOperation} = require('../controllers/operations')

router.get('/:userId', getAllOperations);
router.get('/:userId/:id', getOperation);
router.post('/create', insertOperation);
router.put('/:userId/:id', editOperation);
router.delete('/:id', deleteOperation);

module.exports = router;