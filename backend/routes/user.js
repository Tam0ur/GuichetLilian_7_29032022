//appel chemins
const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/user');

//gestion route user
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;