import { ListBlockedDates } from '../../data/models';
/**
 * @param { [Date]} bookingDateRanges
 * @param { { basePrice: Number, listId: Number }} listData
 * */
export const getPriceForDaysWithSpecialPrice = async (bookingDateRanges, listData) => {
    try {
        const totalDaysCount = bookingDateRanges.length;
        let total = 0;
        const specialDays = await ListBlockedDates.findAll({
            where: {
                listId: listData.listId,
                calendarStatus: 'available',
                blockedDates: {
                    $in : bookingDateRanges
                }
            },
            attributes: ['isSpecialPrice', 'blockedDates'],
            raw: true
        });
        const specialDaysCount = specialDays && specialDays.length || 0;
        if (specialDaysCount > 0){
            const totalSpecialPrice = specialDays.reduce((pre, current) => pre + Number(current.isSpecialPrice), 0);
            total = (totalDaysCount - specialDaysCount) * Number(listData.basePrice) + totalSpecialPrice
            return {
                total, specialDaysCount,
                isSpecialPriceAssigned: true,
                isSpecialPriceAverage: total/totalDaysCount
            };
        }
        total = totalDaysCount * listData.basePrice;
        return {
            total,
            specialDaysCount: 0,
            isSpecialPriceAssigned: false,
            isSpecialPriceAverage: listData.basePrice
        };
    }catch (error) {
        return null;
    }
}