# Loan Sanctioning backend

# About

This repository serves as a frontend for loan sanctioning applcation which is a fullstack loan prediction ML project. You can find the backend frontend part [here](https://github.com/Frdhsn/loan-sanctioning-system-frontend).

# Getting Started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server

# Description

LoanSanction is mainly a ML based loan prediction web app, where a bank customer can become an user by signing up and apply for loan. There are two user modes: customer and employee. Employees of the bank can login to the system and see the loan applications made by customers. An employee can view all the details of that loan application and predict the loan. The loan prediction model is initial done with python, then saved the model in .js. After that we've used @tensorflow/tfjs npm package to reload the ML model into our node.js. After prediction the employee can either apporve or decline the loan. The customer is sent an email to notify about the verdict.

# Tools and Technologies

I have used a remote MySQL database service using Sequelize ORM(https://sequelize.org/)

- [expressjs](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For generating JWTs used by authentication
- [sequelize](https://www.npmjs.com/package/sequelize) - As a promise-based Node.js ORM tool for MySQL
- [cors](https://www.npmjs.com/package/cors) - For enabling CORS with various options.
- [sendGrid](https://www.npmjs.com/package/@sendgrid/mail) - For sending email to customers
- [tensorflow.js](https://www.npmjs.com/package/@tensorflow/tfjs) - For loading ML model written in python to node.js.

  and others.
