//appel chemins
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('./utils/db');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post')

const app = express();

//autorisation des requêtes nécessaires - cors policy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //d'ajouter des headers mentionnés aux requêtes envoyés vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //envoyer des requêtes avec les méthodes mentionnées
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;
