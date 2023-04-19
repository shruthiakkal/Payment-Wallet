var express = require('express');

const {
	createWallet,
	creditDebitWallet,
	fetchTransactionWithPagination,
	fetchWalletDetails
} = require('../../controllers/walletUser');

var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/setup', createWallet);
router.post('/transact/:walletId', creditDebitWallet);
router.get('/transactions', fetchTransactionWithPagination);
router.get('/:walletId', fetchWalletDetails);
module.exports = router;
