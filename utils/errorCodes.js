const errorCode = {};

errorCode.successMessage = {
	Status: 200,
	body: {}
};
errorCode.createWalletReqName = {
	Status: 400,
	errorCode: '1000',
	message: 'No name in req body.',
	displayMessage: 'Enter user name.',
	body: {}
};
errorCode.resourceNotFound = {
	Status: 404,
	errorCode: '1001',
	message: 'Resource not found',
	displayMessage: 'Resource not found',
	body: {}
};
errorCode.createWalletReqError = {
	Status: 422,
	errorCode: '1001',
	message: 'Name length < 3 or balance < 0.',
	displayMessage:
		'Username should have a min of 3 characters and balance should be >=0.',
	body: {}
};
errorCode.createWalletReqLengthError = {
	Status: 422,
	errorCode: '1005',
	message: 'name length < 30.',
	displayMessage: 'Username should be of max 30 characters.',
	body: {}
};
errorCode.createWalletNameExists = {
	Status: 500,
	errorCode: '1002',
	message: 'Select a different username.',
	displayMessage: 'Something went  wrong. Please try again.',
	body: {}
};
errorCode.createWalletDBError = {
	Status: 500,
	errorCode: '1003',
	message: 'User Wallet create error.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};
errorCode.createWalletTransactionDBError = {
	Status: 500,
	errorCode: '1004',
	message: 'Create transaction db error.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};
errorCode.creditDebitWalletReqParam = {
	Status: 400,
	errorCode: '1007',
	message: 'Missing wallet ID.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};
errorCode.creditDebitWalletReqType = {
	Status: 422,
	errorCode: '1008',
	message: 'Req body type error.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};
errorCode.zeroAmountForTransaction = {
	Status: 422,
	errorCode: '1009',
	message: 'Enter non zero amount for transaction',
	displayMessage: 'Enter non zero amount for transaction',
	body: {}
};
errorCode.invalidSortingParameter = {
	Status: 422,
	errorCode: '1010',
	message: 'Invalid sorting parameter',
	displayMessage:
		'Invalid sorting parameter, use AMOUNT/DATE for sortField & DESC/ASC for sortType',
	body: {}
};
errorCode.creditDebitWalletIDNotFound = {
	Status: 500,
	errorCode: '1011',
	message: 'WalletID not found.',
	displayMessage:
		'No transactions allowed, create a wallet to proceed with transactions.',
	body: {}
};
errorCode.creditDebitWalletBalance = {
	Status: 500,
	errorCode: '1012',
	message: 'Low Balance.',
	displayMessage: 'Low Balance.',
	body: {}
};
errorCode.creditDebitWalletAmountGreaterBalance = {
	Status: 500,
	errorCode: '1013',
	message: 'No sufficient balance.',
	displayMessage: 'No sufficient balance.',
	body: {}
};
errorCode.creditDebitWalletUpdateBalance = {
	Status: 500,
	errorCode: '1014',
	message: 'Error updating wallet db.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};
errorCode.creditDebitWalletTransaction = {
	Status: 500,
	errorCode: '1015',
	message: 'Error creating transaction in db.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};
errorCode.fetchTransaction = {
	Status: 500,
	errorCode: '1016',
	message: 'Error fetching transaction from db.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};
errorCode.fetchWalletID = {
	Status: 500,
	errorCode: '1017',
	message: 'WalletID not found.',
	displayMessage:
		'No transaction allowed, created a wallet to proceed with transactions.',
	body: {}
};
errorCode.fetchWalletIDError = {
	Status: 500,
	errorCode: '1018',
	message: 'WalletID fetch error.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};

errorCode.catchError = {
	Status: 500,
	errorCode: '10000',
	message: 'Unknown error.',
	displayMessage: 'Something went wrong. Please try again.',
	body: {}
};

module.exports = errorCode;
