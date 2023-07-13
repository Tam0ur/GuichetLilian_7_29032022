const connection = require('../utils/db')
const moment = require('moment')

exports.createComment = ( req, res, next ) => {
    var text = req.body.comText
    var postId = req.body.postId
    var userId = res.locals.userId
   
    connection.query('INSERT INTO commentaire (texte, utilisateur_id, poste_id, date_Creation) VALUES (?, ?, ?, NOW())', 
    [text, userId, postId ],
    (error, result) => {
        console.log(result);
        if (!error){
            return res.status(201).json({message : 'Commentaire créé.', insertId:result.insertId });
        }
        else {
            return res.status(500).json({ error : 'Problème création commentaire.'})
        }
    });
}

exports.getAllComments = ( req, res, next ) => {
    const postId = req.params.id;
    connection.query('SELECT c.id, texte, utilisateur_id, date_Creation, date_Modification, u.id, nom, prenom, isAdmin FROM commentaire c INNER JOIN utilisateur u ON c.utilisateur_id = u.id WHERE poste_id= ? ORDER BY c.id DESC',
    [postId],
    (error, result) => {
        if ( !error ){
            res.status(200).json(result);
        }
        else {
            res.status(500).json({ error : 'Problème récupération commentaire.'})
        }
    })
}

exports.getThisComment = (req, res, next) => {
    const commentId = req.params.id;
    connection.query('SELECT c.id, texte, utilisateur_id, date_Creation, date_Modification, u.id, nom, prenom, isAdmin FROM commentaire c INNER JOIN utilisateur u ON c.utilisateur_id = u.id WHERE c.id=?', 
    [commentId],
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Aucun commentaire correspondant à cet Id'})
        }
    })
}

exports.deleteComment = ( req, res, next ) => {
    const commentId = req.params.id;

    connection.query('SELECT utilisateur_id FROM commentaire WHERE id=?', [commentId],
        (error_1, result_1) => {
            if ( !error_1 ){
                const com_userId = result_1[0].utilisateur_id;
                res.status(200).json({result_1});
                if( res.locals.userId == com_userId || res.locals.isAdmin == 1 ){
                    connection.query('DELETE FROM commentaire WHERE id=?',
                    [commentId],
                    (error_2, result_2) => {
                        if ( !error_2 ){
                            res.status(200).json({result_2});
                        }
                        else {
                            res.status(500).json({ error_2 : 'Problème suppression commentaire.'})
                        }
                    })
                } else {
                    res.status(403).json({
                        message: 'unauthorized request.'
                    });
                }
            }
            else {
                res.status(500).json({ error_1 : 'Aucun utilisateur correspondant à cet id pour ce commentaire.'})
            }
    });
}

exports.updateComment = ( req, res, next ) => {
    const text = req.body.texte
    const commentId = req.params.id;

    connection.query('SELECT utilisateur_id FROM commentaire WHERE id=?', [commentId], 
    (error_1, result_1) => {
        if ( !error_1 ){
            const com_userId = result_1[0].utilisateur_id;
            if( res.locals.userId == com_userId || res.locals.isAdmin == 1 ){
                connection.query('UPDATE commentaire SET texte = ?, date_Modification = NOW() WHERE id = ?',
                [text, commentId],
                    (error_2, result_2) => {
                        if ( !error_2 ){
                            console.log('2')
                            res.status(200).json({result_2});
                        }
                        else {
                            console.log('3')
                            res.status(500).json({ error_2 : 'Problème mise à jour commentaire.'})
                        } 
                    });
            } else {
                console.log('4')
                res.status(403).json({ message: 'unauthorized request.'});
            }
        }
        else {
            console.log('5')
            res.status(500).json({ error_1 : 'Aucun utilisateur correspondant à cet id pour ce commentaire.'})
        } 
    });
}
