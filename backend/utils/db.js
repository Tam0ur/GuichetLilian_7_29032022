const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.MYSQL_URL || 'remotemysql.com',
  user     : process.env.MYSQL_USERNAME || '3fCRvixynK',
  password : process.env.MYSQL_PASSWORD || 'GNLlV5ZWbD',
  database : process.env.MYSQL_DATABASE || '3fCRvixynK',
});

//connexion à la base de données
connection.connect({
    useNewUrlParser : true,
    useUnifiedTopology: true 
});

module.exports = connection