const express = require('express');
const customers = require('../controllers/customerController');
const authController = require('../controllers/authController');
const customerMiddleware = require('../middleware/customerProtect');

const router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/').get(customers.getAllCustomer);
router
  .route('/:id')
  .get(customers.getCustomerByLoanID)
  .put(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.updateCustomer)
  .delete(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.deleteCustomer);

router
  .route('/loan/:id')
  .get(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.getLoanStatus)
  .post(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.applyForLoan)
  .delete(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.deleteLoanApplication);
module.exports = router;
