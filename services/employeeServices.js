const bcrypt = require('bcrypt');
const calculateScore = require('./../utils/calculateScore');
const emailService = require('./../utils/sendEmail');

class employeeServices {
  constructor(table, loanTable, customerTable) {
    this.employeeTable = table;
    this.loanTable = loanTable;
    this.customerTable = customerTable;
  }
  createEmployee = async (employeeBody) => {
    const password = await bcrypt.hash(employeeBody.password, 10);
    const { name, email } = employeeBody;
    const newEmployee = {
      name,
      email,
      password,
    };
    const employeeData = await this.employeeTable.create(newEmployee);
    return employeeData;
  };
  getEmployee = async (id) => {
    const employeeData = await this.employeeTable.findOne({
      where: { id },
    });
    return employeeData;
  };
  // without password
  getAllEmployee = async () => {
    const employeeData = await this.employeeTable.findAll();
    return employeeData;
  };
  getAllLoanApplications = async () => {
    //console.log(`currently on service `);
    const employeeData = await this.loanTable.findAll();
    //console.log(employeeData);
    return employeeData;
  };
  updateEmployee = async (id, employeeBody) => {
    const employeeData = await this.employeeTable.update(employeeBody, {
      where: { id },
    });
    return employeeData;
  };
  predictLoan = async (id) => {
    const customerData = await this.loanTable.findOne({
      where: { customerID: id },
    });
    //console.log(`searching for customer with id ${id}`);
    //console.log(customerData);
    if (customerData) {
      // first score using weights

      const {
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
        purpose,
      } = customerData;
      const weights = [
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
        purpose,
      ];
      const sc = await calculateScore.calculate(weights);
      customerData.score = sc;
      await customerData.save();
      //console.log(`calculated score: ${sc}`);
      // // update score column
      // const customerData2 = await this.loanTable.update(customerData, {
      //   where: { score: sc },
      // });
      return customerData;
    } else {
      // return error couldn't find error
      return null;
    }
  };
  approveLoan = async (id) => {
    const customerData = await this.loanTable.findOne({
      where: { customerID: id },
    });
    const customerEmail = await this.customerTable.findOne({
      where: { id },
    });
    if (customerData) {
      // first score using weights
      customerData.status = 'approved';
      const message = {
        to: customerEmail,
        subject: 'Loan Approval',
        text: 'Congratulations! your loan has been approved!',
      };
      emailService.sendEmail(message);

      await customerData.save();
      return customerData;
    } else {
      // return error couldn't find any loan with that id
      return null;
    }
  };
  declineLoan = async (id) => {
    const customerData = await this.loanTable.findOne({
      where: { customerID: id },
    });

    const customerEmail = await this.customerTable.findOne({
      where: { id },
    });
    if (customerData) {
      customerData.status = 'declined';
      const message = {
        to: customerEmail,
        subject: 'Loan Declined',
        text: 'Sorry! your loan has been declined!',
      };
      emailService.sendEmail(message);
      await customerData.save();
      return customerData;
    } else {
      // return error couldn't find any loan with that id
      return null;
    }
  };
  deleteLoanApplication = async (id) => {
    const customerData = await this.loanTable.destroy({
      where: { customerID: id },
    });
    return customerData;
  };
  deleteEmployee = async (id) => {
    const employeeData = await this.employeeTable.destroy({
      where: { id },
    });
    return employeeData;
  };
  getEmployeebyEmail = async (email) => {
    const employeeData = await this.employeeTable.findOne({
      where: { email },
    });
    return employeeData;
  };
}
module.exports = employeeServices;
