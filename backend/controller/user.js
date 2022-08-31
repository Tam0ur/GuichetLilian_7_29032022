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
    bcrypt.hash(req.body.password, 10)//hash du mdp
    .then(hash => {
        const user = {//création nouvel utilisateur avec l'e-mail écrit + mdp hashé
            email: req.body.email,
            password: hash
        };
        connection.query('SELECT * FROM utilisateur WHERE email LIKE ? ', user.email, (err, result_email) => {
            if ( (result_email[0].email) != user.email ){
                return res.status(401).json({error : 'Email incorrect.' });
            }
            else {
                connection.query('SELECT * FROM utilisateur WHERE mdp LIKE ? ', user.password, (err, result_mdp) => {
                    if ( (result_mdp[0].mdp) != user.password ){
                        return res.status(401).json({error : 'Mot de passe incorrect.' });
                    }
                    else {
                        return res.status(401).json({error : 'mdp + email corrects'});
                    }
                })
            }
        });
    })
    .catch(error => {
        return res.status(500).json({error})
    });
};
/*
  //UPDATE
  connection.query(
'UPDATE utilisateurs SET city = ? Where ID = ?',['John Doe', 1]
  
  //DESTROY
'DELETE FROM utilisateurs WHERE id = ?', [5], (err, result) => {
*/