

/**
 * @param { { priceForDays: Number, bookingDatesCount: Number,
 *          weeklyDiscountPercent: Number, monthlyDiscountPercent: Number, }} object
 * */
export const calculateDiscount = async ({ priceForDays, bookingDatesCount, weeklyDiscountPercent, monthlyDiscountPercent, ...params}) => {
    try {

        if(bookingDatesCount && bookingDatesCount >= 7){
            if(bookingDatesCount >= 28 && monthlyDiscountPercent &&  monthlyDiscountPercent > 0 ){
                return Number(priceForDays) * Number(monthlyDiscountPercent) /100;
            }
            if(weeklyDiscountPercent && weeklyDiscountPercent > 0){
                return Number(priceForDays) * Number(weeklyDiscountPercent) /100;
            }
        }
        return 0
    }catch (error) {
        console.log(error)
        return 0;
    }
}