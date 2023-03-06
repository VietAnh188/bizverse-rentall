import moment from 'moment';
import countriesDB from 'countries-db'
import momentTimeZone from 'moment-timezone';

export function getDates(startDate, stopDate) {
	let dateArray = [], currentDate = new Date(startDate);

	while (currentDate <= stopDate) {
		dateArray.push(new Date(currentDate.getTime()));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return dateArray;
}

export function getRange(dates) {
	var startDate = null, endDate = null, counter = 0;
	var previousDate = null, datesCollection = [];
	if (dates.length > 0) {
		if (dates.length === 1) {
			datesCollection = [
				{
					startDate: dates[0],
					endDate: dates[0]
				}
			]
		} else {
			dates.map((item) => {
				var dateRange = {};
				var currentDate = moment(item);
				counter++;
				if (previousDate === null) {
					startDate = item;
				}
				if (previousDate != null) {
					var previousDateObject = moment(previousDate);
					var difference = currentDate.diff(previousDateObject, 'days');
					if (difference > 1) {
						endDate = new Date(new Date(previousDate).getTime() + 3600000);
						dateRange = {
							startDate,
							endDate
						};
						datesCollection.push(dateRange);
						startDate = item;
						if (counter === dates.length) {
							endDate = item;
							dateRange = {
								startDate,
								endDate
							};
							datesCollection.push(dateRange);
						}
					} else {
						if (counter === dates.length) {
							endDate = new Date(new Date(item).getTime() + 3600000);
							dateRange = {
								startDate,
								endDate
							};
							datesCollection.push(dateRange);
						}
					}
				}
				previousDate = item;
			});
		}
	}
	return datesCollection;
}

export function getDateUsingTimeZone(country, isUseFormat, format = 'YYYY-MM-DD') {
	if (!country) return moment();
	else {
		let convertedDate;
		const timezones = countriesDB && countriesDB.getCountry(country, 'timezones');
		if (timezones && timezones.length > 0) {
			convertedDate = (timezones && timezones.length > 0) ? momentTimeZone.tz(timezones[0]) : null;
		}

		if (convertedDate && convertedDate != null) {
			if (isUseFormat) {
				convertedDate = convertedDate.format(format);
			}
			return convertedDate;
		} else {
			return moment();
		}
	}
}

export function setDateWithTimeZone(date, country) {
	if (!country || !date) return moment(date);

	let convertedDate;
	const timezones = countriesDB && countriesDB.getCountry(country, 'timezones');
	if (timezones && timezones.length > 0) {
		convertedDate = momentTimeZone.tz(date, timezones[0]);
	}

	return convertedDate || moment(date);
}

export function getDateRanges({ checkIn, country, checkOut }) {
	let startDate = setDateWithTimeZone(checkIn, country).startOf('day'),
		endDate = setDateWithTimeZone(checkOut, country).startOf('day'),
		today = getDateUsingTimeZone(country, false).startOf('day');
	return {
		nights: endDate.diff(startDate, 'days'),
		interval: startDate.diff(today, 'days'),
		today
	};
}