const Sequelize = require('sequelize');
// db configuration
const config = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'loan-sanction',
  dialect: 'mysql',
};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  dialect: config.dialect,
  host: config.HOST,
});

module.exports = sequelize;
