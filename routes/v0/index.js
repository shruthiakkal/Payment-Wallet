var express = require('express');

var router = express.Router();

const wallet = require('../v0/wallets');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.use('/wallet', wallet);

module.exports = router;
