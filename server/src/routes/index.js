const { Router } = require('express');
//Importar los routers 

const categoryRoutes = require('./category');
const userRoutes = require('./user');
const operationRoutes = require('./operation');
const authRoutes = require('./auth');

const router = Router();

router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/operations', operationRoutes);
router.use('/auth', authRoutes);

module.exports = router;