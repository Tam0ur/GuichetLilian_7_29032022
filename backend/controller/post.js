const connection = require('../utils/db')
const moment = require('moment')

exports.createPost = (req, res, next) => {

    var userId = res.locals.userId
    var text = req.body.texte

    const date = req.body.date;  
    console.log(date)  
    connection.query('INSERT INTO poste (texte, utilisateur, image, date_Creation) VALUES (?, ?, ?, ?)', 
    [text, userId,`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, date], 
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
    connection.query('SELECT * FROM poste ', (error, result) => {
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

    connection.query('SELECT * FROM poste WHERE id=?', 
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
}

exports.updatePost = (req, res, next) => {

    const text = req.body.texte
    const now = moment();
    const date = now.toDate();
    const  formattedDate =  date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'numeric', year: 'numeric', });
    
    connection.query('UPDATE poste SET texte = ?, image = ?, date_Modification = ? WHERE id = ?',
    [text,`${req.protocol}://${req.get('host')}/images/${req.file.filename}`, formattedDate, req.params.id],
    (error, result) => {
        if ( !error ){
            res.status(200).json({result});
        }
        else {
            res.status(500).json({ error : 'Problème mise à jour poste.'})
        } 
    });
}

