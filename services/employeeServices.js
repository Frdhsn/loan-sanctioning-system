const bcrypt = require('bcrypt');

class employeeServices {
  constructor(table) {
    this.employeeTable = table;
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
  updateEmployee = async (id, employeeBody) => {
    const employeeData = await this.employeeTable.update(employeeBody, {
      where: { id },
    });
    return employeeData;
  };
  approveLoan = async (id, employeeBody) => {
    employeeBody.loanee = 1;
    //employeeBody.score = calculate();
    const employeeData = await this.employeeTable.update(employeeBody, {
      where: { id },
    });
    return employeeData;
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
