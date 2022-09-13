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
  /*
  currentLoanAmount,
      creditScore,
      annualIncome,
      yearsInCurrentJob,
      monthlyDebt,
      yearsofCreditHistory,
      lastDelinquent,
      openAccounts,
      creditProblems,
      creditBalance,
      maxOpenCredit,
      bankruptcies,
      term,
      homeOwnership,
      purpose,*/
  currentLoanAmount: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  creditScore: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  annualIncome: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  yearsInCurrentJob: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  monthlyDebt: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  yearsofCreditHistory: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  lastDelinquent: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  openAccounts: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  creditProblems: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  creditBalance: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  maxOpenCredit: {
    type: Sequelize.DOUBLE,
    defaultValue: 0,
  },
  bankruptcies: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  term: {
    type: Sequelize.STRING,
    defaultValue: 'Long Term',
  },
  homeOwnership: {
    type: Sequelize.STRING,
    defaultValue: 'Own Home',
  },
  purpose: {
    type: Sequelize.STRING,
    defaultValue: 'Buy House',
  },
});

module.exports = loanapplication;
