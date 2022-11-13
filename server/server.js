const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/v1/companies', require('./routes/company.router'));
app.use('/api/v1/users', require('./routes/user.router'));
app.use('/api/v1/goals', require('./routes/goal.router'));
app.use('/api/v1/auth', require('./routes/auth.router'));

app.listen(process.env.SERVER_PORT || 3000);
console.log('SERVER RUNNING ON PORT ' + (process.env.SERVER_PORT || 3000));