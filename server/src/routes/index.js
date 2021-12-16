const { Router } = require('express');
//Importar los routers 

const categoryRoutes = require('./category');
const userRoutes = require('./user');
const walletRoutes = require('./wallet');
//const operationRoutes = require('./operation');

const router = Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/wallets', walletRoutes);
//router.use('/operation', operationRoutes);

module.exports = router;