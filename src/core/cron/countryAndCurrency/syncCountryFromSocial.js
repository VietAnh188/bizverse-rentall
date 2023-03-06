var CronJob = require('cron').CronJob;
import { Country } from '../../../data/models';
import fetch from 'node-fetch';
import { bizverseLinkSocialApp } from '../../../config'

const syncCountryFromSocial = app => {

	new CronJob('0 0 * * 1', async function () { // Run At 00:00 on every Sunday.
		console.log("/********************************************/");
		console.log("HOLY MOLY SYNC COUNTRY FROM SOCIAL CRON STARTED");

		try {
			const URL = `${bizverseLinkSocialApp}api/list-country`;
			const resp = await fetch(URL);
			const { data: { item: items = [] } = {} } = await resp.json();

			items.forEach(async item => {
				const { id } = item;
				const country = await Country.findOne({
					where: {
						id
					},
					raw: true
				})

				if (country) {
					Country.update({
						...item,
						isEnable: undefined,
						createdAt: undefined,
						updatedAt: undefined
					}, {
						where: {
							id
						}
					})
				} else {
					Country.create({
						...item,
						isEnable: 1,
						createdAt: undefined,
						updatedAt: undefined
					})
				}
			});

		} catch(error) {
			console.log('--------------------------------- sync country from social error ---------------------------', error)
		}

		console.log("HOLY MOLY SYNC COUNTRY FROM SOCIAL CRON COMPLETED");
		console.log("/********************************************/");

	}, null, true, 'Asia/Ho_Chi_Minh');
};

export default syncCountryFromSocial;