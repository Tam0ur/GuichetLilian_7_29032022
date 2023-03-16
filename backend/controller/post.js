const connection = require('../utils/db')
const moment = require('moment')

exports.createPost = (req, res, next) => {
    console.log('1')
    var userId = res.locals.userId
    var text = req.body.texte

    const now = moment();
    const date = now.toDate();
    const  formattedDate =  date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric', });
    connection.query('INSERT INTO postes (texte, utilisateur, image, date_Creation) VALUES (?, ?, ?, ?)', 
    [text, userId,`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, formattedDate], 
    (error, result) => {
        if (!error){
            console.log('réussi')
            return res.status(201).json({message : 'Texte, utilisateur et date insérés.' });
        }
        else {
            console.log('non')
            return res.status(500).json({ error : 'Problème création poste.'})
        }
    });
};

exports.getAllPosts = (req, res, next) => {
    connection.query('SELECT * FROM postes ', (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Problème récupération poste.'})
        }
    })
}

exports.getThisPost = (req, res, next) => {

    const postId = req.params.id;

    connection.query('SELECT * FROM postes WHERE id=?', 
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

exports.updatePost = (req, res, next) => {

    const text = req.body.texte
    const now = moment();
    const date = now.toDate();
    const  formattedDate =  date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric', });

    connection.query('UPDATE postes SET texte = ?, date_Modification = ?, WHERE id = ?',
    [text, formattedDate, req.params.id],
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Problème mise à jour poste.'})
        } 
    });
}

exports.deletePost= (req, res, next) => {

    const postId = req.params.id;

    connection.query('DELETE FROM postes WHERE id=?',
    [postId],
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Problème suppression poste.'})
        }
    })
}