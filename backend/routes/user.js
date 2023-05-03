//appel chemins
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controller/user');

//gestion route user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/deleteUser/:id', auth, userCtrl.deleteUser )

module.exports = router;