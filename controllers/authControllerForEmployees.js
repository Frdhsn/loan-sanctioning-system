const Employee = require('../models/employeemodel');
const catchAsync = require('../utils/catchAsync');
const EmployeeService = require('../services/employeeServices');
const AppError = require('../utils/AppError');
const bcrypt = require('bcrypt');
const { signToken } = require('../utils/generateToken');
const contentNegotiate = require('../utils/sendResponse');
//const User = db.users;
const employeeService = new EmployeeService(Employee);

exports.signup = catchAsync(async (req, res) => {
  // password hash
  const employee = await employeeService.createEmployee(req.body); // has security issue

  const token = signToken(employee.id);
  const employeeData = {
    employee,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, employeeData, 'Sigup Successfull');
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(`Please provide email and password!`, 400));
  }
  const employee = await employeeService.getEmployeebyEmail(email);

  if (!employee) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }
  const isValidPassword = await bcrypt.compare(password, employee.password);

  if (!isValidPassword) {
    return next(new AppError(`Incorrect email or password!`, 401));
  }

  const token = signToken(employee.id);
  const employeeData = {
    employee,
    token,
  };
  contentNegotiate.sendResponse(req, res, 200, employeeData, 'Login Successfull');
});
