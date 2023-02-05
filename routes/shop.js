const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

const adminRoutes = require('./admin');

const shopController = require('../controllers/shop');

// * GET => /
router.get('/', shopController.getIndex);
// * GET => /products
router.get('/products', shopController.getProducts);
// * GET => /cart
router.get('/cart', shopController.getCart);
// * GET => /checkout
router.get('/checkout', shopController.getChechout);

module.exports = router;