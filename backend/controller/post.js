const connection = require('../utils/db')

exports.createPost = (req, res, next) => {
    console.log('1')
    var userId = res.locals.userId
    var text = req.body.texte
    let date = new Date().toLocaleDateString("fr-FR");
    connection.query('INSERT INTO postes (texte, utilisateur, image, date_Creation) VALUES (?, ?, ?, ?)', [text, userId,`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, date]), (err, result) => {
        if (!err){
            return res.status(201).json({message : 'Texte, utilisateur et date insérés.' });
        }
        else {
            return res.status(500).json({ error : 'Problème création poste.'})
        }
    };
};

exports.getAllPosts = (req, res, next) => {
    
    connection.query('SELECT * FROM postes '), (err, result) => {
        if ( !err ){
            console.log('1')
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Problème récupération poste.'})
        }
    }
}