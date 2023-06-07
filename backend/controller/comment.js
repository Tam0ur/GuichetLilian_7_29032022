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
    connection.query('SELECT * FROM commentaire WHERE poste_id= ?',
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

    connection.query('SELECT * FROM commentaire WHERE id=?', 
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
    connection.query('SELECT * FROM commentaire WHERE id=?', 
    [commentId],
    (error, result) => {
        const comment = result;
        if( comment.utilisateur_id == res.locals.userId || res.locals.isAdmin == 1 ){
            connection.query('DELETE FROM commentaire WHERE id=?',
            [commentId],
            (error, result) => {
                if ( !error ){
                    res.status(200).json({result});
                }
                else {
                    res.status(500).json({ error : 'Problème suppression commentaire.'})
                }
            })
        } else {
            res.status(403).json({
                message: 'unauthorized request.'
            });
        }
    })
}

exports.updateComment = ( req, res, next ) => {
    const text = req.body.texte
    
    const commentId = req.params.id;
    connection.query('SELECT * FROM commentaire WHERE id=?', 
    [commentId],
    (error, result) => {
        const comment = result;
        if( comment.utilisateur_id == res.locals.userId || res.locals.isAdmin == 1 ){
            connection.query('UPDATE commentaire SET texte = ?, date_Modification = NOW() WHERE id = ?',
            [text, formattedDate, req.params.id],
            (error, result) => {
                if ( !error ){
                    res.status(200).json({result});
                }
                else {
                    res.status(500).json({ error : 'Problème mise à jour commentaire.'})
                } 
            });
        } else {
            res.status(403).json({
                message: 'unauthorized request.'
            });
        }
    })
}

