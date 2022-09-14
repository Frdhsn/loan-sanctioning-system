const express = require('express');
const employee = require('../controllers/employeeController');
const authController = require('../controllers/authControllerForEmployees');
const employeeMiddleware = require('../middleware/employeeProtect');

const router = express.Router();

router.route('/signup').post(authController.signup); // only admin can create employees
router.route('/login').post(authController.login);
router.route('/loan/').get(employeeMiddleware.Protect, employee.getAllLoanApplications);
router
  .route('/:id')
  .get(employee.getEmployee)
  .put(employeeMiddleware.Protect, employeeMiddleware.isAuthorized, employee.updateEmployee)
  .delete(employeeMiddleware.Protect, employeeMiddleware.isAuthorized, employee.deleteEmployee);

router
  .route('/loan/:id')
  .get(employeeMiddleware.Protect, employee.getLoanStatus)
  .delete(employeeMiddleware.Protect, employee.deleteLoanApplication);
router.route('/loan/:id/approve').put(employeeMiddleware.Protect, employee.approveLoanApplication);
router.route('/loan/:id/decline').put(employeeMiddleware.Protect, employee.declineLoanApplication);
router.route('/loan/:id/predict').put(employeeMiddleware.Protect, employee.predictLoanApplication);
router.route('/').get(employee.getAllEmployee);

module.exports = router;
