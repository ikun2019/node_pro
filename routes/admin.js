const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

// * GET => /admin/add-product
router.get('/add-product', adminController.getAddProduct);
// * GET => /admin/products
router.get('/products', adminController.getAddProduct);
// * POST => /admin/add-product
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;