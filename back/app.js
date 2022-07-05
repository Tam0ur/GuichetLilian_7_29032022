var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "groupomania"
});

con.connect(function(err) {
  if (err);
  console.log("Connected!");
  
  con.query("SELECT * FROM utilisateurs;", function (err, result, fields) {
    if (err) ;
    console.log(result);
  });
});