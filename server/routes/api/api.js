const express = require('express');
const router = express.Router();
const productsRouter = require('./products');
const materialsRouter = require('./materials');

router.use('/products', productsRouter);
router.use('/materials', materialsRouter);

module.exports = router;
