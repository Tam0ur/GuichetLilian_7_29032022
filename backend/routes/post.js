//gestion des gestions dans le routeur Express
//appels chemin
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controller/post');

//gestion chemin fonctions post
router.get('/getAllPosts', auth,  postCtrl.getAllPosts);
router.post('/createPost', auth, multer, postCtrl.createPost);
router.get('/getThisPost/:id', auth, postCtrl.getThisPost);
router.delete('/deletePost/:id', auth, postCtrl.deletePost);
router.put('/updatePost/:id', auth, multer, postCtrl.updatePost);

module.exports = router;