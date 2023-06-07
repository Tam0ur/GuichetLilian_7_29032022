const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.MYSQL_URL || 'sql7.freemysqlhosting.net',
  user     : process.env.MYSQL_USERNAME || 'sql7614494',
  password : process.env.MYSQL_PASSWORD || 'Hhwn9kHGTW',
  database : process.env.MYSQL_DATABASE || 'sql7614494',
});

//connexion à la base de données
connection.connect({
    useNewUrlParser : true,
    useUnifiedTopology: true 
});

module.exports = connection
