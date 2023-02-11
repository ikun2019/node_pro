const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

const adminRoutes = require('./admin');

const shopController = require('../controllers/shop');

// * GET => /
router.get('/', shopController.getIndex);
// * GET => /products
router.get('/products', shopController.getProducts);
// * GET => /products/:productId
router.get('/products/:productId', shopController.getProduct);
// * DELETE => /products/delete/:productId
router.get('/products/delete/:productId');

// * GET => /cart
router.get('/cart', shopController.getCart);
// * POST => /cart
router.post('/cart', shopController.postCart);
// * POST => /cart-delete-item
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// * POST => /create-order
router.post('/create-order', shopController.postOrder);
// * GET => /orders
router.get('/orders', shopController.getOrders);

module.exports = router;