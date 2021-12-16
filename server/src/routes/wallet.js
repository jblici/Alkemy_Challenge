const { Router } = require('express');
const router = Router();
const { getAllWallets, getWallet } = require('../controllers/wallets')

router.get('/', getAllWallets);
router.get('/:id', getWallet);

module.exports = router;