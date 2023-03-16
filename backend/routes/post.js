//gestion des gestions dans le routeur Express
//appels chemin
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controller/post');

//gestion chemin fonctions sauce
router.get('/getAllPosts', postCtrl.getAllPosts);
router.post('/createPost', auth, multer, postCtrl.createPost);
router.get('/getThisPost/:id', auth, postCtrl.getThisPost);
router.delete('/deletePost/:id', auth, postCtrl.deletePost);
/*router.put('/:id', auth, multer, postCtrl.modifySauce);
router.post('/:id/like', auth, postCtrl.likeSauce);
*/
module.exports = router;