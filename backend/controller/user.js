/*DEPENDANCES*/
//appel chemins
const bcrypt = require('bcrypt');
const json = require('express');
const jwt = require('jsonwebtoken');
const connection = require('../utils/db')

//création utilisateur
//http://localhost:3306/api/auth/signup
exports.signup = (req, res, next ) => {
    bcrypt.hash(req.body.password, 10)//hash du mdp
    .then(hash => {
        const user = {//création nouvel utilisateur avec l'e-mail écrit + mdp hashé
            email: req.body.email,
            password: hash
        };
        connection.query('SELECT * FROM utilisateur WHERE email LIKE ? ', user.email, (err, result) => {
            if (result == undefined ){//gestion si l'utilisateur n'est pas dans la base de données
                connection.query('INSERT INTO utilisateur ( email, mdp) VALUES (?, ? )', [user.email, user.password], (err, result) => {
                    if (!err){
                        return res.status(201).json({message : 'Utilisateur inséré.' });
                    }
                    else {
                        return res.status(500).json({ error : 'Problème création compte.'})
                    }
                });
            }
            else {
                return res.status(500).json({ error : 'Compte déjà existant.'})
            }
        });
    })
    .catch(error => {
        return res.status(500).json({error})
    });
};

//gestion connexion utilisateur
exports.login = (req, res, next ) => {
    const user = {//création nouvel utilisateur avec l'e-mail écrit + mdp hashé
        email: req.body.email,
        password : req.body.password
    };
    connection.query('SELECT mdp FROM utilisateur', (err, result) => {
        for ( i = 0; i < result.length; i++){
            console.log(result[i].mdp)
            bcrypt.compare(result[i].mdp, user.password)
            .then(valid => {
                if (!valid){//gestion si le mdp ne correspond pas
                    return res.status(401).json({ error : 'Mot de passe incorrect.'});
                }
                res.status(200).json({ message : 'Mot de passe correct'});
            });
            
        }
        return res.status(401).json({ error : 'Mot de passe incorrect.'});
    })
        /*bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){//gestion si le mdp ne correspond pas
                return res.status(401).json({ error : 'Mot de passe incorrect.'});
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'randompassword',
                    {expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));*/
};

//CREATE
/*
function test() {
    const  mail = document.getElementById("mail").innerHTML;
    const mdp = document.getElementById("mdp").innerHTML;
    const user = { mail, mdp};
    console.log( user );
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
    */