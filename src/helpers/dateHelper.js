import moment from 'moment';
import countriesDB from 'countries-db';
import momentTimeZone from 'moment-timezone';

export function getDateUsingTimeZone(country, isFormat, format = 'YYYY-MM-DD') {
  if (!country) return moment();
  else {
    let convertedDate;
    const timezones =
      countriesDB && countriesDB.getCountry(country, 'timezones');
    if (timezones && timezones.length > 0) {
      convertedDate =
        timezones && timezones.length > 0
          ? momentTimeZone.tz(timezones[0])
          : null;
    }

    if (convertedDate && convertedDate != null) {
      if (isFormat) {
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

export function subtractDate(startDate, endDate) {
  return (new Date(startDate) - new Date(endDate)) / 1000 / 60;
}
