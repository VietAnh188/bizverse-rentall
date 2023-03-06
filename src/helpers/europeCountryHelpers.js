const europeCountries = [
    // 'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 
    // 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 
    // 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',

    'AT', 'BE', 'BG', 'CY', 'CZ', 'DK', 'EE',
    'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
    'LV', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 
    'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH',
];

function isEuropeCountry(requestCountry) {
    return requestCountry && europeCountries.indexOf(requestCountry) >= 0;
}

export {
    isEuropeCountry
};