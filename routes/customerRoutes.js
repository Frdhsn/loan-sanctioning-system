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
  .get(customers.getCustomer)
  .put(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.updateCustomer)
  .delete(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.deleteCustomer);
//.post(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.applyForLoan);

router
  .route('/loan/:id')
  .delete(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.deleteLoanApplication)
  .post(customerMiddleware.Protect, customerMiddleware.isAuthorized, customers.applyForLoan);

module.exports = router;
