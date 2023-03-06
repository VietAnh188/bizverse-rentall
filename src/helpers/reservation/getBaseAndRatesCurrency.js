import { Currencies, CurrencyRates } from "../../data/models";
/**
 * @returns { Promise<[base: String, rates: Object ]>}
 * */
export const getBaseAndRatesCurrency = async () => {
    try {
        const [rates, base] = await Promise.all([
            CurrencyRates.findAll({
                raw: true
            }).then(currencyRates => {
                const rates = {} // for fx convert money
                currencyRates.forEach(({ currencyCode, rate}) =>{
                    rates[currencyCode] = rate;
                });
                return rates;
            }),
            Currencies.findOne({
                where: {
                    isBaseCurrency: true
                },
                raw: true
            }).then(baseCurrency => baseCurrency.symbol),
        ]);
        return [base, rates]
    }catch (error) {
        console.log(error)
        return [null, null]
    }
}