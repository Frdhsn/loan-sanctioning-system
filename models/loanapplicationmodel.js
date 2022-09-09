const Sequelize = require('sequelize');
const sequelize = require('./dbconnect');

const loanapplication = sequelize.define('loanapplications', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerID: {
    type: Sequelize.INTEGER,
    foreignKey: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 'OnReview',
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  w1: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  w2: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  w3: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  w4: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  w5: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = loanapplication;
