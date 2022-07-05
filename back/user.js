/*DEPENDANCES*/
//var mysql = require('mysql');


//CREATE
function test() {
  const  mail = document.getElementById("mail").innerHTML;
  const mdp = document.getElementById("mdp").innerHTML;
  const user = { mail, mdp};
  console.log( user );
}

function login(){
  connection.query('SELECT * FROM utilisateurs WHERE email LIKE ? ', user.mail, (err, res) => {
    if(err) throw err;
    console.log('utilisateur valide')
  });
  connection.query('INSERT INTO utilisateurs VALUES ?', user, (err, res) => {
    if(err) throw err;
    console.log('utilisateur inséré');
  });
}

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});



//UPDATE
connection.query(
    'UPDATE utilisateurs SET city = ? Where ID = ?',
    ['John Doe', 1],
    (err, result) => {
      if (err) throw err;
  
      console.log(`Changed ${result.changedRows} row(s)`);
    }
  );

//DESTROY
connection.query(
    'DELETE FROM utilisateurs WHERE id = ?', [5], (err, result) => {
      if (err) throw err;
  
      console.log(`Deleted ${result.affectedRows} row(s)`);
    }
  );