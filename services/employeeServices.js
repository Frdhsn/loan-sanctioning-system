const bcrypt = require('bcrypt');
const calculateScore = require('./../utils/calculateScore');

class employeeServices {
  constructor(table, loanTable) {
    this.employeeTable = table;
    this.loanTable = loanTable;
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
  // WIP
  predictLoan = async (id) => {
    const customerData = await this.loanTable.findOne({
      where: { customerID: id },
    });
    //console.log(`searching for customer with id ${id}`);
    //console.log(customerData);
    if (customerData) {
      // first score using weights

      const { w1, w2, w3, w4, w5 } = customerData;
      const weights = [w1, w2, w3, w4, w5];
      const sc = calculateScore.calculate(weights);
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
    if (customerData) {
      // first score using weights

      if (customerData.score > 5) {
        customerData.status = 'approved';
      }
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
    if (customerData) {
      customerData.status = 'declined';
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
