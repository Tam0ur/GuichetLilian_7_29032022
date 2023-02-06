const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : process.env.MYSQL_URL || 'sql11.freemysqlhosting.net',
  user     : process.env.MYSQL_USERNAME || 'sql11591126',
  password : process.env.MYSQL_PASSWORD || 'bq8kgTJ13z',
  database : process.env.MYSQL_DATABASE || 'sql11591126',
});

//connexion à la base de données
connection.connect({
    useNewUrlParser : true,
    useUnifiedTopology: true 
});

module.exports = connection