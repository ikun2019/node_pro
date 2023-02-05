const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');
const productsController = require('../controllers/products');

// * GET => /admin/add-product
router.get('/add-product', productsController.getAddProduct);

// * POST => /admin/add-product
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;