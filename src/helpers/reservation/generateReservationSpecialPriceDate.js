import { ListBlockedDates } from '../../data/models';
import { getBaseAndRatesCurrency } from './getBaseAndRatesCurrency';
import { convert } from '../currencyConvertion';

export const generateReservationSpecialPriceDate = async (bookingDateRange, listData, guestCurrency) => {
    try {
        const [base, rates] = await getBaseAndRatesCurrency();
        return await Promise.all(
            bookingDateRange.map(async date => {
                const specialPrice = await ListBlockedDates.findOne({
                    where: {
                        listId: listData.listId,
                        calendarStatus: "available",
                        blockedDates: date,
                    },
                    attribute: ["blockedDates", "isSpecialPrice"],
                    raw: true
                });
                if (specialPrice && specialPrice.blockedDates && specialPrice.isSpecialPrice) {
                    return {
                        blockedDates: specialPrice.blockedDates,
                        isSpecialPrice: convert(base, rates, specialPrice.isSpecialPrice, listData.currency, guestCurrency)
                    };
                } else {
                    return {
                        blockedDates: date,
                        isSpecialPrice: convert(base, rates, listData.basePrice, listData.currency, guestCurrency)
                    }
                }
            })
        );
    }catch(error){
        console.log(error)
        return null;
    }
}