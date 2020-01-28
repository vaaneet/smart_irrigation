var express = require('express');
var router = express.Router();

const controller = require('../controller/index');

/* GET home page. */
router.get('/', controller.landing);

router.get('/form',controller.getForm);

router.post('/form',controller.postForm);


router.get('/getAllfarmers',controller.getAllfarmers);

module.exports = router;
