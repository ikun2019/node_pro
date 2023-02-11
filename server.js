const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const expressHbs = require('express-handlebars');
const errorController = require('./controllers/error');

const sequelize = require('./util/database');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

// app.engine('hbs', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'ejs');
app.set('views', 'views');

// db.execute('SELECT * FROM products')
//   .then(results => {
//     console.log(results);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

// ! 静的ファイルの使用
app.use(express.static(path.join(__dirname, '/public')));

// ! 常にユーザー情報を持たせるミドルウェア
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

// ! routerのマウント
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// ! アソシエーション
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// モデルをデータベースに同期 * force:trueはテーブルを上書きする設定のため、開発中のみ使用
// sequelize.sync({ force: true })
sequelize.sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: 'Max',
        email: 'test@test.com'
      });
    }
    return Promise.resolve(user);
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

