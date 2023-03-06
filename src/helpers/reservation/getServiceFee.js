import { ServiceFees } from '../../data/models';
import { getBaseAndRatesCurrency } from './getBaseAndRatesCurrency';
import { convert } from "../currencyConvertion";
/**
 * @param { Number } total
 * @param { String } toCurrency
 * @returns { Promise({ guestFee: Number, hostFee: Number })}
 * */
export const getServiceFee = async (total, toCurrency) => {
    try {
        let guestFee, hostFee;
        const [serviceFee, [base, rates]] = await Promise.all([
            ServiceFees.findOne({ raw: true }),
            getBaseAndRatesCurrency()
        ])
        if(serviceFee && serviceFee.guestType === 'percentage' && serviceFee.hostType === 'percentage'){
            guestFee = total * Number(serviceFee.guestValue) /100 ;
            hostFee = total * Number(serviceFee.hostValue) /100 ;
        }
        if(serviceFee && serviceFee.guestType === 'fixed' &&  serviceFee.hostType === 'fixed'){
            guestFee = convert(base, rates, serviceFee.guestValue, serviceFee.currency, toCurrency);
            hostFee = convert(base, rates, serviceFee.hostValue, serviceFee.currency, toCurrency);
        }
        return {
            guestFee, hostFee
        }
    }catch (error) {
        console.log(error)
        return { }
    }
}