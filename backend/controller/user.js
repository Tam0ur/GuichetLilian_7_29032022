/*DEPENDANCES*/
//appel chemins
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//création utilisateur
exports.signup = (req, res, next ) => {
    bcrypt.hash(req.body.password, 10)//hash du mdp
    .then(hash => {
        const user = new User({//création nouvel utilisateur avec l'e-mail écrit + mdp hashé
            email: req.body.email,
            password: hash
        });
        user.save()//sauvegarde utilisateur
        .then(() => res.status(201).json({ message: 'Utilisateur créé.'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

//création utilisateur
exports.signup = (req, res, next ) => {
    bcrypt.hash(req.body.password, 10)//hash du mdp
    .then(hash => {
        const user = new User({//création nouvel utilisateur avec l'e-mail écrit + mdp hashé
            email: req.body.email,
            password: hash
        });
        con.query('SELECT * FROM utilisateurs WHERE email LIKE ? ', user.mail, (err, res) => {
            if (res == 0 ){//gestion si l'utilisateur n'est pas dans la base de données
                con.query('INSERT INTO utilisateurs VALUES ?', user, (err, res) => {
                    if (!err){
                        return res.status(0).json({error : 'Utilisateur inséré.' });
                    }
                });
                return res.status(0).json({error : 'Utilisateur non trouvé.' });
            }
        });
    })
    .catch(error => res.status(500).json({error}));
};

//gestion connexion utilisateur
exports.login = (req, res, next ) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user){//gestion si l'utilisateur n'est pas dans la base de données
            return res.status(401).json({error : 'Utilisateur non trouvé.' });
        }
        bcrypt.compare(req.body.password, user.password)
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
        .catch(error => res.status(500).json({ error }));
    })
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