//gestion des gestions dans le routeur Express
//appels chemin
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentCtrl = require('../controller/comment');

//gestion chemin fonctions commentaires
router.get('/getAllComments/:id', auth, commentCtrl.getAllComments);
router.post('/createComment', auth, commentCtrl.createComment);
router.get('/getThisComment/:id', auth, commentCtrl.getThisComment);
router.delete('/deleteComment/:id', auth, commentCtrl.deleteComment);
router.put('/updateComment/:id', auth, multer, commentCtrl.updateComment);

module.exports = router;