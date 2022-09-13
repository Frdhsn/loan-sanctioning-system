const Sequelize = require('sequelize');
const sequelize = require('./dbconnect');

const customer = sequelize.define('customers', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bankAccountNo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  score: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
    // validate: {
    //   notEmpty: true,
    // },
  },
  loanee: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    // validate: {
    //   notEmpty: true,
    // },
  },
});

module.exports = customer;
