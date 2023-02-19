const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '02151353', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
/*
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://test:02151353@cluster0.eohtvfm.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected!');
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;
*/