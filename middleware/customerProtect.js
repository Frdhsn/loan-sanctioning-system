const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Customer = require('../models/customermodel');
const catchAsync = require('../utils/catchAsync');
const CustomerService = require('../services/customerServices');
const AppError = require('../utils/AppError');
const loanapplication = require('../models/loanapplicationmodel');

//const User = db.users;
const customerService = new CustomerService(Customer, loanapplication);

exports.isAuthorized = catchAsync(async (req, res, next) => {
  const customer = await customerService.getCustomer(req.params.id);
  if (!customer) {
    return next(new AppError('No user was found with that ID', 404));
  }
  if (customer.name !== req.user.name) {
    return next(new AppError(`You don't have the permission`, 403));
  }
  next();
});

exports.Protect = catchAsync(async (req, res, next) => {
  let token;
  //1) getting token and check of its there
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError(`You're not logged in! Please log in to get access.`, 401));
  }

  //2) Verification

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // not have a clear idea how it works

  //console.log(decoded);
  //3) user still exists
  const freshUser = await customerService.getCustomer(decoded.id); // or

  //console.log('freshUser = ' + freshUser);
  if (!freshUser) {
    return next(new AppError(`The user belonging to this token does no longer exist`, 401));
  }

  //4) check if user changed password after jwt was issued\
  console.log(`before assigning: `);
  //console.log(req.user);
  req.user = freshUser;
  //console.log(`sudo`);
  //console.log(freshUser);
  console.log(req.body);
  console.log(`---------------------------end of protect!------------------------`);
  next();
});
