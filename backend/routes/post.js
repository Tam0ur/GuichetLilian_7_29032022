//gestion des gestions dans le routeur Express
//appels chemin
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controller/post');

//gestion chemin fonctions sauce
router.get('/getAll', postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
/*router.get('/:id', auth, postCtrl.getOneSauce);
router.put('/:id', auth, multer, postCtrl.modifySauce);
router.delete('/:id', auth, postCtrl.deleteSauce);
router.post('/:id/like', auth, postCtrl.likeSauce);
*/
module.exports = router;