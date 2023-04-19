const { v4 } = require('uuid');
const momentTZ = require('moment-timezone');

// const Wallet =  require("../models/wallet");

import db from '../models';
import { roundOffFDecimalPlaces } from '../utils/walletUtils';
import errorCode from '../utils/errorCodes';

const Wallet = db.sequelize.models.Wallet;
const Transactions = db.sequelize.models.Transactions;

export const createWallet = async (req, res) => {
	var t = await db.sequelize.transaction();

	// TODO no password check - anyone can access anyone's wallet by trying usernames.

	try {
		const { name, balance = 0 } = req.body;
		const transactionID = v4();

		if (!name) {
			await t.rollback();
			return res.status(400).json(errorCode.createWalletReqName);
		}

		if (typeof name != 'string' || typeof balance != 'number') {
			await t.rollback();
			return res.status(400).json(errorCode.createWalletReqType);
		}

		if (name.length < 3 || balance < 0) {
			await t.rollback();
			return res.status(500).json(errorCode.createWalletReqError);
		}

		if (name.length > 30) {
			await t.rollback();
			return res.status(500).json(errorCode.createWalletReqLengthError);
		}

		const checkNameExists = await Wallet.findOne({
			where: { name }
		});

		if (checkNameExists?.dataValues) {
			await t.rollback();
			return res.status(500).json(errorCode.createWalletNameExists);
		}

		let balanceRounded = roundOffFDecimalPlaces(balance, 4);

		const userWallet = await Wallet.create(
			{
				name,
				balance: balanceRounded
			},
			{ transaction: t }
		);

		if (!userWallet?.dataValues || !userWallet?.dataValues?.id) {
			await t.rollback();
			return res.status(500).json(errorCode.createWalletDBError);
		}

		const createTransaction = await Transactions.create(
			{
				id: transactionID,
				walletID: userWallet.dataValues.id,
				balanceAfterTransaction: balanceRounded,
				transactionAmount: balanceRounded,
				transactionType: 'CREDIT',
				transactionStatus: 'COMPLETED',
				description: 'top up'
			},
			{ transaction: t }
		);

		if (
			!createTransaction?.dataValues ||
			!createTransaction?.dataValues?.id
		) {
			await t.rollback();
			return res
				.status(500)
				.json(errorCode.createWalletTransactionDBError);
		}

		await t.commit();

		const responseData = {
			id: userWallet?.dataValues?.id ? userWallet.dataValues.id : null,
			balance: userWallet?.dataValues?.balance
				? userWallet.dataValues.balance
				: 0,
			transactionId: createTransaction?.dataValues?.id
				? createTransaction.dataValues.id
				: null,
			name: userWallet?.dataValues?.name
				? userWallet.dataValues.name
				: null,
			date: userWallet?.dataValues?.createdAt
				? momentTZ(userWallet.dataValues.createdAt)
						.tz('Asia/Kolkata')
						.format()
				: null
		};

		return res
			.status(200)
			.json({ ...errorCode.successMessage, body: { ...responseData } });
	} catch (error) {
		await t.rollback();
		return res.status(500).json(errorCode.catchError);
	}
};

export const testTransaction = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('WAIT FOR 10 SECONDS');
			resolve('DONE');
		}, 10000);
	});
};

export const creditDebitWallet = async (req, res) => {
	var t = await db.sequelize.transaction();

	try {
		const { amount, description } = req.body;

		if (amount == 0) {
			await t.rollback();
			return res.status(400).json(errorCode.zeroAmountForTransaction);
		}

		const { walletId } = req.params;
		const transactionID = v4();

		if (!walletId) {
			await t.rollback();
			return res.status(400).json(errorCode.creditDebitWalletReqParam);
		}

		if (typeof amount != 'number' || typeof description != 'string') {
			await t.rollback();
			return res.status(400).json(errorCode.creditDebitWalletReqType);
		}

		const checkWalletIDBalance = await Wallet.findOne({
			where: { id: walletId }
		});

		// No wallet to credit or debit
		if (!checkWalletIDBalance?.dataValues?.id) {
			await t.rollback();
			return res.status(500).json(errorCode.creditDebitWalletIDNotFound);
		}

		// Min balance should be 0
		let balance = checkWalletIDBalance?.dataValues?.balance;

		if (amount < 0 && (!balance || balance === 0)) {
			await t.rollback();
			return res.status(500).json(errorCode.creditDebitWalletBalance);
		}

		// if debit, and amount to be debited > balance
		if (
			amount < 0 &&
			Math.abs(amount) > checkWalletIDBalance?.dataValues?.balance
		) {
			await t.rollback();
			return res
				.status(500)
				.json(errorCode.creditDebitWalletAmountGreaterBalance);
		}

		let netAmount = balance + amount;
		netAmount = roundOffFDecimalPlaces(netAmount, 4);
		let transactionAmount = roundOffFDecimalPlaces(Math.abs(amount), 4);

		// TODO check for max amount that can be credited and debited

		const findAndUpdateWallet = await Wallet.update(
			{
				balance: netAmount
			},
			{
				where: {
					id: walletId
				},
				transaction: t
			}
		);

		if (!findAndUpdateWallet.length) {
			await t.rollback();
			return res
				.status(500)
				.json(errorCode.creditDebitWalletUpdateBalance);
		}

		if (!description) {
			description = amount > 0 ? 'top up' : 'withdrawal';
		}

		const createTransaction = await Transactions.create(
			{
				id: transactionID,
				walletID: walletId,
				balanceAfterTransaction: netAmount,
				transactionAmount,
				transactionType: amount >= 0 ? 'CREDIT' : 'DEBIT',
				transactionStatus: 'COMPLETED',
				description
			},
			{ transaction: t }
		);

		if (
			!createTransaction?.dataValues ||
			!createTransaction?.dataValues?.id
		) {
			await t.rollback();
			return res.status(500).json(errorCode.creditDebitWalletTransaction);
		}

		await t.commit();

		const responseData = {
			balance: createTransaction?.dataValues?.balanceAfterTransaction
				? createTransaction.dataValues.balanceAfterTransaction
				: 0,
			transactionId: createTransaction?.dataValues?.id
				? createTransaction.dataValues.id
				: null
		};

		return res
			.status(200)
			.json({ ...errorCode.successMessage, body: { ...responseData } });
	} catch (error) {
		await t.rollback();
		return res.status(500).json(errorCode.catchError);
	}
};

export const fetchTransactionWithPagination = async (req, res) => {
	try {
		const {
			walletId,
			skip,
			limit,
			sortType = 'DESC',
			sortField = 'AMOUNT'
		} = req.query;

		const findOneWallet = await Wallet.findOne({
			where: { id: walletId },
			attributes: ['name', 'balance', 'createdAt']
		});

		// No wallet to credit or debit
		if (!findOneWallet?.dataValues) {
			return res.status(500).json(errorCode.fetchWalletID);
		}

		if (
			(sortField != 'AMOUNT' && sortField != 'DATE') ||
			(sortType != 'DESC' && sortType != 'ASC')
		) {
			return res.status(500).json(errorCode.invalidSortingParameter);
		}

		const findWalletIDTransactions = await Transactions.findAll({
			limit,
			offset: skip * limit,
			where: { walletID: walletId },
			order: [
				[
					sortField == 'DATE' ? 'createdAt' : 'transactionAmount',
					sortType
				]
			],
			attributes: [
				'id',
				'walletID',
				'balanceAfterTransaction',
				'transactionAmount',
				'transactionType',
				'description',
				'createdAt'
			]
		});

		if (!findWalletIDTransactions) {
			return res.status(500).json(errorCode.fetchTransaction);
		}

		const responseData = [];

		for (let i = 0; i < findWalletIDTransactions.length || 0; i++) {
			let data = findWalletIDTransactions[i];
			let modifiedData = {};
			modifiedData['id'] = data.id;
			modifiedData['walletId'] = data.walletID;
			modifiedData['amount'] = data.transactionAmount;
			modifiedData['balance'] = data.balanceAfterTransaction;
			modifiedData['description'] = data.description;
			modifiedData['date'] = momentTZ(data.createdAt)
				.tz('Asia/Kolkata')
				.format();
			modifiedData['type'] = data.transactionType;
			responseData.push(modifiedData);
		}

		return res
			.status(200)
			.json({ ...errorCode.successMessage, body: responseData });
	} catch (error) {
		return res.status(500).json(errorCode.catchError);
	}
};

export const fetchWalletDetails = async (req, res) => {
	try {
		const { walletId } = req.params;

		const findOneWallet = await Wallet.findOne({
			where: { id: walletId },
			attributes: ['name', 'balance', 'createdAt']
		});

		// No wallet to credit or debit
		if (!findOneWallet?.dataValues) {
			return res.status(500).json(errorCode.fetchWalletIDError);
		}

		if (!findOneWallet?.dataValues?.name) {
			return res.status(500).json(errorCode.fetchWalletID);
		}

		const responseData = {
			id: walletId,
			name: findOneWallet?.dataValues?.name
				? findOneWallet.dataValues.name
				: null,
			balance: findOneWallet?.dataValues?.balance
				? findOneWallet.dataValues.balance
				: 0,
			date: findOneWallet?.dataValues?.createdAt
				? momentTZ(findOneWallet.dataValues.createdAt)
						.tz('Asia/Kolkata')
						.format()
				: null
		};

		return res
			.status(200)
			.json({ ...errorCode.successMessage, body: { ...responseData } });
	} catch (error) {
		return res.status(500).json(errorCode.catchError);
	}
};
