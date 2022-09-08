require('dotenv').config();
const express = require('express');
const customers = require('./routes/customerRoutes');

const db = require('./config/dbconfig');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
)
app.use(express.json());
db();
app.use('/api/v1/customers',customers);
// app.use('/',(req,res)=>{
//     res.json({message: 'hello from server'});
// })
// unhandled requests
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`));
  });
app.use(globalErrorHandler);

const port = 3005;
app.listen(port,()=>{
    console.log(`app running on port ${port}...`);
})