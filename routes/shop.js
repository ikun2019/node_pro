const router = require('express').Router();
const path = require('path');
const rootDir = require('../util/path');

const adminRoutes = require('./admin');

const productsController = require('../controllers/products');

// * GET => /
router.get('/', productsController.getProducts);

module.exports = router;