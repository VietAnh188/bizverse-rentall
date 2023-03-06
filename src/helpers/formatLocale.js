import moment from 'moment';
import { languages } from '../constants/languages'

const rtlLocateDict = ['he', 'ar'];

export const getCountryCode = (locale = 'en-US') => {
    const countryCodeParts = locale.split("-");

    if (countryCodeParts.length > 1) {
        return countryCodeParts[1]
    }

    const countryCode = countryCodeParts[0];

    if (countryCode === 'vi') {
        return 'vn'
    }

    return countryCode || 'US'
}

export function formatLocale(locale) {
    return languages[locale] || 'English';
}

export function isRTL(locale) {
    return locale && rtlLocateDict.indexOf(locale) >=0;
}

export function generateMomentLocaleSettings(locale) {
    var localeData = moment.localeData('en');
    let response = { 
        ordinal: localeData.ordinal()
    };
    return response;
}