/*DEPENDANCES*/
//appel chemins
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../utils/db')

//création utilisateur
exports.signup = (req, res, next ) => {
    bcrypt.hash(req.body.mdp, 10)//hash du mdp
    .then(hash => {
        const user = {//création nouvel utilisateur avec l'e-mail écrit + mdp hashé
            nom : req.body.nom,
            prenom : req.body.prenom,
            email: req.body.email,
            mdp: hash
        };
        connection.query('SELECT * FROM utilisateur WHERE email LIKE ? ', user.email, (err, result) => {
            if (result.length == 0 ){//gestion si l'utilisateur n'est pas dans la base de données
                connection.query('INSERT INTO utilisateur (nom, prenom, email, mdp) VALUES (?, ?, ?, ?)', [user.nom, user.prenom, user.email, user.mdp], (err, result) => {
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
        mdp: req.body.mdp
    };
    connection.query('SELECT * FROM utilisateur WHERE email LIKE ? ', user.email, (err, result) => {
        if ( result[0].email != user.email ){
            return res.status(401).json({error : 'Email incorrect.' });
        }
        else {
            bcrypt.compare(user.mdp, result[0].mdp )
            .then(valid => {
                if (!valid){//gestion si le mdp ne correspond pas
                    return res.status(401).json({ error : 'Mot de passe incorrect.'});
                }
                res.status(200).json({
                    token: jwt.sign(
                        { userId: result[0].id, isAdmin: result[0].isAdmin },
                        'randompassword',
                        {expiresIn: '24h' }
                    ),
                    userId: result[0].id,
                    isAdmin: result[0].isAdmin,
                });
            })
            .catch(error => res.status(500).json({ error }));
        }
    }); 
};

//gestion suppression utilisateur
exports.deleteUser = (req, res, next ) => {
    const userId = req.params.id;

    connection.query('DELETE FROM utilisateur WHERE id = ?',
    [userId],
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            
            res.status(500).json({ error : 'Problème suppression utilisateur.'})
        }
    })
}
