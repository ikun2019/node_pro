// TODO:controller

const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        path: '/products',
        pageTitle: 'All Products'
      });
    })
    .catch(err => {
      console.log(err);
    });
  // const products = Product.fetchAll((products) => {
  //   res.render('shop/product-list', {
  //     prods: products,
  //     path: '/products',
  //     pageTitle: 'Shop',
  //   });
  // });
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/product-list', {
  //       prods: rows,
  //       path: '/products',
  //       pageTitle: 'All Products'
  //     })
  //   })
  //   .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findAll({ where: { id: prodId }})
  .then(products => {
    res.render('shop/product-detail', {
      product: products[0],
      path: '/products',
      pageTitle: products[0].title
    })
  })
  .catch(err => {
    console.log(err);
  });
  // Product.findByPk(prodId)
  //   .then(product => {
  //     res.render('shop/product-detail', {
  //       product: product,
  //       path: '/products',
  //       pageTitle: product.title
  //     });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // Product.findById(prodId, product => {
  //   res.render('shop/product-detail', {
  //     product: product,
  //     path: '/products',
  //     pageTitle: product.title
  //   });
  // });
  // Product.findById(prodId)
  //   .then(([product]) => {
  //     res.render('shop/product-detail', {
  //       product: product[0],
  //       path: '/products',
  //       pageTitle: product.title
  //     });
  //   })
  //   .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      })
    })
    .catch(err => {
      console.log(err);
    });
  // const products = Product.fetchAll((products) => {
  //   res.render('shop/index', {
  //     prods: products,
  //     path: '/',
  //     pageTitle: 'Shop',
  //   });
  // });
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render('shop/index', {
  //       prods: rows,
  //       pageTitle: 'Shop',
  //       path: '/'
  //     })
  //   })
  //   .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      console.log(cart);
      return cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (let product of products) {
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   })
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId }});
    })
    .then(products => {
      let product;
      // 既に商品がカートに入っている場合はnewQuantityを増やす
      if (products.length > 0){
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      // 商品がカートに入っていなかった場合は商品オブジェクトを返す
      return Product.findByPk(prodId)
    })
    .then(product => {
      // 商品がカートに入っていなかった場合の処理
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
  // const prodId = req.body.productId;
  // console.log(prodId);
  // Product.findById(prodId, product => {
  //   console.log(product);
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
};

exports.getChechout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};
