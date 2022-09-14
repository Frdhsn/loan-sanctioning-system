const sequelize = require('../models/dbconnect');

const db = async () => {
  try {
    //await sequelize.sync();
    await sequelize.sync({})();
    //await sequelize.sync({ force: true })();
    //await sequelize.sync({ alter: true })();
    console.log('The connection has been successfully established......');
  } catch (error) {
    console.error('The database cannot be accessed:', error);
  }
};

module.exports = db;
