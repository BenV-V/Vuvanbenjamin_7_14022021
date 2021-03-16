const express = require('express');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const fileRoutes = require('./routes/file');

const path = require('path');

const app = express();

//Header pour contourner les erreurs de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Permet de mettre les données en Json afin de les exploiter
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: false
}));
app.use(bodyParser.json({limit: "50mb"}));
//Gestion de l'image
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/file', fileRoutes);

module.exports = app;