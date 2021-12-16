const { Router } = require('express');
const router = Router();
const { getAllUsers, getUser } = require('../controllers/users')

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;