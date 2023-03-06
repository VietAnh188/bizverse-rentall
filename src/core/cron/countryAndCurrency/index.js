import syncCountryFromSocial from "./syncCountryFromSocial"
import syncCurrencyRates from "./syncCurrencyRates"

const syncDB = app => {
    syncCountryFromSocial(app);
    syncCurrencyRates(app);
}

export default syncDB