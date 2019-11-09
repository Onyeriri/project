import '@babel/polyfill';
import express from 'express';
import bodyparser from 'body-parser';

import ErrorHandler from './Utils/feedbackHandler';
import EmployeeRoute from './routes/employeeRoute';


const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use('/api/v1', EmployeeRoute);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-type');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    next();
});

app.use(ErrorHandler.error);

app.listen(3000, () => {
    console.log('app is running on port 3000');
})

export default app;