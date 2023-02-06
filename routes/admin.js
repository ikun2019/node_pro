const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

// * GET => /admin/add-product
router.get('/add-product', adminController.getAddProduct);
// * GET => /admin/products
router.get('/products', adminController.getProduct);
// * POST => /admin/add-product
router.post('/add-product', adminController.postAddProduct);
// * GET => /admin/edit-product
router.get('/edit-product/:productId', adminController.getEditProduct);
// * POST => /admin/edit-product
router.post('/edit-product', adminController.postEditProduct);

module.exports = router;
// exports.routes = router;
// exports.products = products;