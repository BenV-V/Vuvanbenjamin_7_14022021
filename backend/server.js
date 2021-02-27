const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user')
require('dotenv').config({path: './config/.env'});
const db = require('./config/db')
const app = express();
 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use('/api/user', userRoutes);

// serveur
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
    db.query('SELECT * FROM posts', (error, result, field) => {

      console.table(result);
    });
    db.query('SELECT * FROM users', (error, result, field) => {

      console.table(result);
    });
  })