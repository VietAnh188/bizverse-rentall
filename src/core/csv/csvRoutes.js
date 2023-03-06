var csv = require('csv-express');

import { getTransactions } from './getTransactionsData';

import {
	users,
	reservations,
	listings
} from './adminData';

let allowedTransactionTypes = ['completed', 'future', 'grossEarnings'];

const csvRoutes = app => {

	app.get('/export-transaction', async (req, res) => {
		var type = req.query && req.query.type,
			hostId = req.user && req.user.id,
			toCurrency = req.query && req.query.toCurrency,
			listId = req.query && req.query.listId,
			payoutId = req.query && req.query.payoutId;

		if (!req.user || !req.user.id || req.user.admin || !allowedTransactionTypes.includes(type)) {
			res.redirect('/');
			return '';
		}

		let data = await getTransactions({ hostId, toCurrency, type, listId, payoutId });

		res.setHeader('Content-disposition', 'attachment; filename=' + type + '-transactions.csv');
		res.set('Content-Type', 'text/csv');
		res.csv(data, true);
	});

	app.get('/export-admin-data', async function (req, res) {
		try {
			var type = req.query.type;
			let userType = req.query.usertype
			let keyword = req.query.keyword
			if (req.user && req.user.admin && type) {
				let data = [];
				if (type === 'users') {
					data = await users(keyword, userType);
				} else if (type === 'listings') {
					data = await listings(keyword);
				} else if (type === 'reservations') {
					data = await reservations(keyword);
				}
				res.setHeader('Content-disposition', 'attachment; filename=' + type + '-data.csv');
				res.set('Content-Type', 'text/csv');
				res.csv(data, true);
			} else {
				res.redirect('/');
			}
		}
		catch (error) {
			console.log('******************Export CSV Error******************');
			console.log(error);
			res.redirect('/');
		}
	});
};

export default csvRoutes;