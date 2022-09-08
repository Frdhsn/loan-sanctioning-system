const  Customer = require('../models/customermodel');
const catchAsync = require('../utils/catchAsync');
const CustomerService = require('../services/customerServices');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/generateToken');
const contentNegotiate = require('../utils/sendResponse');
//const User = db.users;
const customerService = new CustomerService(Customer);

exports.signup = catchAsync(async (req, res) => {
  //console.log(`signup a ashchi`);
  // password hash
  const customer = await customerService.createCustomer(req.body); // has security issue

  const token = signToken(customer.id);
  const customerData = {
    customer,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, customerData, 'Sigup Successfull');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(`Please provide email and password!`, 400));
  }
  const customer = await customerService.getCustomerbyEmail(email);

  if (!customer) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }
  const isValidPassword = await bcrypt.compare(password,customer.password);

  if (!isValidPassword) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }

  const token = signToken(customer.id);
  const customerData = {
    customer,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, customerData, 'Login Successfull');
});
