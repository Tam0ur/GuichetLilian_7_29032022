/*BACKEND -- NODEMON SERVER*/
/*FRONTEND -- NPM RUN SERVE*/
require('dotenv').config();
//déclaration variables 
const http = require('http');
const app = require('./app');

//GESTION DU PORT
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0 ){
        return port;
    }
    return false;
};

//MISE EN PLACE DU PORT POUR L'APPLICATION
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//GESTION DE L'ERREUR
const errorHandler = error => {
    if (error.syscall !== 'listen'){
        throw error;
    }
    const address = server.adress();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port : ' + port;
    switch (error.code){
        case 'EACCES':
            console.error(bind + 'requires elevated privilages.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

//CREATION DU SERVER
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port : ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);