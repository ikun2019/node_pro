const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '02151353', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;