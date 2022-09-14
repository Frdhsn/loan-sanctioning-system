const bcrypt = require('bcrypt');

class customerServices {
  constructor(table, loanTable) {
    this.customerTable = table;
    this.loanTable = loanTable;
  }
  createCustomer = async (customerBody) => {
    const password = await bcrypt.hash(customerBody.password, 10);
    const { name, email, bankAccountNo } = customerBody;
    const newCustomer = {
      name,
      email,
      bankAccountNo,
      password,
    };
    const customerData = await this.customerTable.create(newCustomer);
    return customerData;
  };
  getCustomer = async (id) => {
    const customerData = await this.customerTable.findOne({
      where: { id },
    });
    return customerData;
  };
  getCustomerByLoanID = async (id) => {
    const customerData = await this.loanTable.findOne({
      where: { id },
    });
    const customerData2 = await this.customerTable.findOne({
      where: { id: customerData.customerID },
    });
    return customerData2;
  };
  getLoanStatus = async (id) => {
    const customerData = await this.loanTable.findOne({
      where: { customerID: id },
    });
    return customerData;
  };
  // without password
  getAllCustomer = async () => {
    const customerData = await this.customerTable.findAll();
    return customerData;
  };
  updateCustomer = async (id, customerBody) => {
    const customerData = await this.customerTable.update(customerBody, {
      where: { id },
    });
    return customerData;
  };
  applyForLoan = async (id, customerBody) => {
    // check for already applied for loan or not

    let customerData = await this.loanTable.findOne({
      where: { customerID: id },
    });
    console.log(`is on table: `, customerData);
    if (customerData === null) {
      customerBody.loanee = 1;
      //customerBody.score = calculate();
      customerData = await this.customerTable.update(customerBody, {
        where: { id },
      });
      console.log(`before changes in loan table`);
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
      } = customerBody;
      const newCustomer = {
        customerID: id,
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
      };
      customerData = await this.loanTable.create(newCustomer);
      return customerData;
    } else {
      return null;
    }
  };
  deleteCustomer = async (id) => {
    const customerData = await this.customerTable.destroy({
      where: { id },
    });
    return customerData;
  };
  deleteLoanApplication = async (id) => {
    const customerData = await this.loanTable.destroy({
      where: { customerID: id },
    });
    return customerData;
  };
  getCustomerbyEmail = async (email) => {
    const customerData = await this.customerTable.findOne({
      where: { email },
    });
    return customerData;
  };
  getCustomerbyID = async (id) => {
    const customerData = await this.customerTable.findOne({
      where: { id },
    });
    return customerData;
  };
}
module.exports = customerServices;
