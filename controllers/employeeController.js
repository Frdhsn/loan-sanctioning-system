const Employee = require('../models/employeemodel');
const EmployeeService = require('../services/employeeServices');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const contentNegotiate = require('../utils/sendResponse');
const loanapplication = require('../models/loanapplicationmodel');
const Customer = require('../models/customermodel');

const employeeService = new EmployeeService(Employee, loanapplication, Customer);

exports.getEmployee = catchAsync(async (req, res, next) => {
  const employeeData = await employeeService.getEmployee(req.params.id);
  if (!employeeData) {
    return next(new AppError('No Employee was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, employeeData, 'Employee Fetched Successfully!');
});
exports.getLoanStatus = catchAsync(async (req, res, next) => {
  //console.log(`controller a achi`);
  const customerData = await employeeService.getLoanStatus(req.params.id);
  //console.log(`@loan status `);
  //console.log(customerData.dataValues);
  if (!customerData) {
    return next(new AppError('No loan application found with this customer ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, customerData, 'Loan Status Fetched Successfully!');
});
exports.getAllEmployee = catchAsync(async (req, res, next) => {
  const employeesData = await employeeService.getAllEmployee();
  contentNegotiate.sendResponse(req, res, 200, employeesData, 'Employees Fetched Successfully!');
});
exports.getAllLoanApplications = catchAsync(async (req, res, next) => {
  //console.log(`hit controller`);
  const employeesData = await employeeService.getAllLoanApplications();
  contentNegotiate.sendResponse(req, res, 200, employeesData, 'All Loan Applications Fetched Successfully!');
});
exports.updateEmployee = catchAsync(async (req, res, next) => {
  const employeeData = await employeeService.updateEmployee(req.params.id, req.body);
  if (!employeeData[0]) {
    return next(new AppError('No employee was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, {}, 'Employee is Updated!');
});
// WIP
exports.predictLoanApplication = catchAsync(async (req, res, next) => {
  const employeeData = await employeeService.predictLoan(req.params.id);
  console.log('were at predict loan controller! ');
  console.log(employeeData);
  if (employeeData === null) {
    return next(new AppError('No loan found to predict', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, employeeData, 'Loan prediction done!');
});
exports.approveLoanApplication = catchAsync(async (req, res, next) => {
  const loanData = await employeeService.approveLoan(req.params.id);
  if (loanData === null) {
    return next(new AppError('No loan found to approve', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, loanData, 'Loan approved!');
});
exports.declineLoanApplication = catchAsync(async (req, res, next) => {
  const loanData = await employeeService.declineLoan(req.params.id);
  if (loanData === null) {
    return next(new AppError('No loan found to decline', 404));
  }
  contentNegotiate.sendResponse(req, res, 200, loanData, 'Loan declined!');
});
exports.deleteLoanApplication = catchAsync(async (req, res, next) => {
  const employeeData = await employeeService.deleteLoanApplication(req.params.id);
  if (!employeeData) {
    return next(new AppError('No Loan was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 204, {}, 'Loan application is Deleted!');
});
exports.deleteEmployee = catchAsync(async (req, res, next) => {
  const employeeData = await employeeService.deleteEmployee(req.params.id);
  if (!employeeData) {
    return next(new AppError('No user was found with that ID', 404));
  }
  contentNegotiate.sendResponse(req, res, 204, {}, 'Employee is Deleted!');
});
exports.employeeService = employeeService;
