const AppError = require('../utils/AppError');

// need to add for production and development
const handleJWTError = () => new AppError(`Invalid token. Please log in again!`, 401);
const handleJWTExpiredError = () => new AppError(`Your token has expired. Please log in again!`, 401);

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  //console.log(`------------the error is here---------------------`);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err, res) => {
  // Operational. trusted error: semd , message to client
  if (err.isOperational) {
    // message is not working
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } // programming or other unknown error: don't want to leak error details
  else {
    // log error
    console.error(`ERROR `, err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    console.log(`error name ` + error.name);

    if (error.name == 'CastError') error = handleCastErrorDB(error);
    sendErrorProd(error, res);
  }
  if (err.name === 'JsonWebTokenError') err = handleJWTError();
  if (err.name === 'TokenExpiredError') err = handleJWTExpiredError();

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
