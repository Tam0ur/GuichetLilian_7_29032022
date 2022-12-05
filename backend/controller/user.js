/*DEPENDANCES*/
//appel chemins
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../utils/db')
//test
//création utilisateur
//http://localhost:3000/api/auth/signup
exports.signup = (req, res, next ) => {
    bcrypt.hash(req.body.password, 10)//hash du mdp
    .then(hash => {
        const user = {//création nouvel utilisateur avec l'e-mail écrit + mdp hashé
            name : req.body.name,
            fname : req.body.fname,
            email: req.body.email,
            password: hash
        };
        connection.query('SELECT * FROM utilisateur WHERE email LIKE ? ', user.email, (err, result) => {
            console.log(result)
            if (result.length == 0 ){//gestion si l'utilisateur n'est pas dans la base de données
                connection.query('INSERT INTO utilisateur (nom, prenom, email, mdp) VALUES (?, ?, ?, ? )', [user.name, user.fname, user.email, user.password], (err, result) => {
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
        console.log(error)
        return res.status(500).json({error})
    });
};

//gestion connexion utilisateur
exports.login = (req, res, next ) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    connection.query('SELECT * FROM utilisateur WHERE email LIKE ? ', user.email, (err, result) => {
        if ( result[0].email != user.email ){
            return res.status(401).json({error : 'Email incorrect.' });
        }
        else {
            bcrypt.compare(user.password, result[0].mdp )
            .then(valid => {
                if (!valid){//gestion si le mdp ne correspond pas
                    return res.status(401).json({ error : 'Mot de passe incorrect.'});
                }
                res.status(200).json({
                    token: jwt.sign(
                        { userId: user._id },
                        'randompassword',
                        {expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        }
    }); 
};
/*
  //UPDATE
  connection.query(
'UPDATE utilisateurs SET city = ? Where ID = ?',['John Doe', 1]
  
  //DESTROY
'DELETE FROM utilisateurs WHERE id = ?', [5], (err, result) => {
*/