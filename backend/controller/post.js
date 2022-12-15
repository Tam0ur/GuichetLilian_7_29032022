const connection = require('../utils/db')

exports.createPost = (req, res, next) => {
    var userId = res.locals.userId
    let date = new Date().toLocaleDateString("fr_FR");
    console.log('1')
    connection.query('INSERT INTO postes (texte, utilisateur, image, date_Création) VALUES (?, ?, ?, ?)', [text, userId,`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, date]), (err, result) => {
        if (!err){
            return res.status(201).json({message : 'Texte, utilisateur et date insérés.' });
        }
        else {
            return res.status(500).json({ error : 'Problème création poste.'})
        }
    };
};

exports.getAllPosts = (req, res, next) => {
    console.log(error)
    connection.query('SELECT * FROM postes '), (err, result) => {
        if ( !err ){
            return res.status(200).json({result});
        }
        else {
            return res.status(500).json({ error : 'Problème récupération poste.'})
        }
    }
}