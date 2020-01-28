var express = require('express');
var router = express.Router();

const controller = require('../controller/index');

/* GET home page. */
router.get('/', controller.getApiTest);

router.get('/getRecentFarmer',controller.getRecentFarmer);

router.post('/updateRecentFarmer/:id',controller.updateRecentFarmer);

module.exports = router;
