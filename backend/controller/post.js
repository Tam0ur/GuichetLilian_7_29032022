const connection = require('../utils/db')

exports.createPost = (req, res, next) => {

    var userId = res.locals.userId
    var text = req.body.texte
    const image = req.file != null ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null

    connection.query('INSERT INTO poste (texte, utilisateur_id, image, date_Creation) VALUES (?, ?, ?, NOW() )', 
    [text, userId, image], 
    (error, result) => {
        if (!error){
            return res.status(201).json({message : 'Poste créé.' });
        }
        else {
            return res.status(500).json({ error : 'Problème création poste.'})
        }
    });
};

exports.getAllPosts = (req, res, next) => {
    connection.query(' SELECT p.id, texte, utilisateur_id, image, date_Creation, date_Modification, nom, prenom, isAdmin FROM poste p INNER JOIN utilisateur u ON p.utilisateur_id = u.id', 
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            console.log(error)
            res.status(500).json({ error : 'Problème récupération poste.'})
        }
    })
}

exports.getThisPost = (req, res, next) => {
    const postId = req.params.id;

    connection.query('SELECT p.id, texte, utilisateur_id, image, date_Creation, date_Modification,  nom, prenom, isAdmin FROM poste p INNER JOIN utilisateur u ON p.utilisateur_id = u.id WHERE p.id=?', 
    [postId],
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Aucun poste correspondant à cet Id'})
        }
    })
}

exports.deletePost= (req, res, next) => {
    const postId = req.params.id;

    if( req.locals.userId == req.user.id || req.locals.isAdmin == 1 ){
        connection.query('DELETE FROM poste WHERE id=?',
        [postId],
        (error, result) => {
            if ( !error ){
                res.status(200).json({result});
            }
            else {
                res.status(500).json({ error : 'Problème suppression poste.'})
            }
        })
    } else {
        res.status(403).json({
            message: 'unauthorized request.'
        });
    }
    
}

exports.updatePost = (req, res, next) => {
    const text = req.body.texte
    
    if( req.locals.userId == req.user.id || req.locals.isAdmin == 1 ){
        connection.query('UPDATE poste SET texte = ?, image = ?, date_Modification = NOW() WHERE id = ?',
        [text,`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, req.params.id],
        (error, result) => {
            if ( !error ){
                res.status(200).json({result});
            }
            else {
                res.status(500).json({ error : 'Problème mise à jour poste.'})
            } 
        });
    } else {
        res.status(403).json({
            message: 'unauthorized request.'
        });
    }
}

