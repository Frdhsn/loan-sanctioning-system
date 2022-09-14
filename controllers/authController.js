const Customer = require('../models/customermodel');
const catchAsync = require('../utils/catchAsync');
const CustomerService = require('../services/customerServices');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/generateToken');
const contentNegotiate = require('../utils/sendResponse');
//const User = db.users;
const customerService = new CustomerService(Customer);

exports.signup = catchAsync(async (req, res) => {
  // password hash
  const user = await customerService.createCustomer(req.body); // has security issue

  const token = signToken(user.id);
  const customerData = {
    user,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, customerData, 'Sigup Successfull');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(`Please provide email and password!`, 400));
  }
  const user = await customerService.getCustomerbyEmail(email);

  if (!user) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }

  const token = signToken(user.id);
  const customerData = {
    user,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, customerData, 'Login Successfull');
});
