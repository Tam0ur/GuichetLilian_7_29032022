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
    connection.query(' SELECT p.id, texte, utilisateur_id, image, date_Creation, date_Modification, nom, prenom, isAdmin FROM poste p INNER JOIN utilisateur u ON p.utilisateur_id = u.id ORDER BY p.id DESC', 
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

    connection.query('SELECT utilisateur_id FROM poste WHERE id=?', [postId],
        (error_1, result_1) => {
            if ( !error_1 ){
                const post_userId = result_1[0].utilisateur_id;
                res.status(200).json({result_1});
                if( res.locals.userId == post_userId || res.locals.isAdmin == 1 ){
                    connection.query('DELETE FROM poste WHERE id=?',
                    [postId],
                    (error_2, result_2) => {
                        if ( !error_2 ){
                            res.status(200).json({result_2});
                        }
                        else {
                            res.status(500).json({ error_2 : 'Problème suppression poste.'})
                        }
                    })
                } else {
                    res.status(403).json({
                        message: 'unauthorized request.'
                    });
                }
            }
            else {
                res.status(500).json({ error_1 : 'Aucun utilisateur correspondant à cet id pour ce poste.'})
            }
    });
}

exports.updatePost = (req, res, next) => {
    const text = req.body.texte
    const postId = req.params.id
    const image = req.file != null ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null
    
    connection.query('SELECT utilisateur_id FROM poste WHERE id=?', [postId],
        (error_1, result_1) => {
            if ( !error_1 ){
                const post_userId = result_1[0].utilisateur_id;
                res.status(200).json({result_1});
                if( res.locals.userId == post_userId || res.locals.isAdmin == 1 ){
                    connection.query('UPDATE poste SET texte = ?, image = ?, date_Modification = NOW() WHERE id = ?',
                    [text,image , req.params.id],
                    (error_2, result_2) => {
                        if ( !error_2 ){
                            res.status(200).json({result_2});
                        }
                        else {
                            res.status(500).json({ error_2 : 'Problème mise à jour poste.'})
                        } 
                    });
                } else {
                    res.status(403).json({
                        message: 'unauthorized request.'
                    });
                }
            }
            else {
                res.status(500).json({ error_1 : 'Aucun utilisateur correspondant à cet id pour ce poste.'})
            }
    });
}

