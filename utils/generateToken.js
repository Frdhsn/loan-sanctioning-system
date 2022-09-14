const jwt = require('jsonwebtoken');

exports.signToken = (id) => {
  // id, name, issueTime, role
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
