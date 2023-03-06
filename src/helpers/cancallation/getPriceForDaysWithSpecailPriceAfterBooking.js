import { Reservation, ReservationSpecialPricing } from '../../data/models';
/**
 * @param { [Date] } bookingDateRanges
 * @param { Number } reservationId
 * @returns { Promise<Number> }
 * */
export const getPriceForDaysWithSpecialPriceAfterBooking = async (bookingDateRanges, reservationId) =>{
    try {
        let total = 0;
        const specialDays = await ReservationSpecialPricing.findAll({
            where: {
                reservationId,
                blockedDates: {
                    $in : bookingDateRanges
                }
            },
            attributes: ['isSpecialPrice', 'blockedDates'],
            raw: true
        });
        const specialDaysCount = specialDays && specialDays.length;
        if (specialDaysCount > 0){
            // when createReservation, always store all booking date with isSpecialPrice(isSpecialPrice = basePrice if isSpecialPriceAssigned = false)
            total = specialDays.reduce((pre, current) => pre + Number(current.isSpecialPrice), 0);
        }
        return total
    }catch (error) {
        console.log(error)
        return null;
    }
}