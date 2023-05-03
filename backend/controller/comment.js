const connection = require('../utils/db')
const moment = require('moment')

exports.createComment = ( req, res, next ) => {
    var text = req.body.comText
    var postId = req.body.postId
    var userId = res.locals.userId

    const now = moment();
    const date = now.toDate();
    const formattedDate =  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric', });
    connection.query('INSERT INTO commentaire (texte, utilisateur_id, date_Creation, poste_id) VALUES (?, ?, ?, ?)', 
    [text, userId, formattedDate, postId ],
    (error, result) => {
        if (!error){
            return res.status(201).json({message : 'Commentaire créé.' });
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
}

exports.updateComment = ( req, res, next ) => {
    const text = req.body.texte
    const now = moment();
    const date = now.toDate();
    const  formattedDate =  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric', });
    
    connection.query('UPDATE commentaire SET texte = ?, date_Modification = ? WHERE id = ?',
    [text, formattedDate, req.params.id],
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Problème mise à jour commentaire.'})
        } 
    });
}

