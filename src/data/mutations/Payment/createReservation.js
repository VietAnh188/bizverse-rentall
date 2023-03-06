// Graphql
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import ReservationType from '../../types/ReservationType';
import dateRange from './dateRange';

// Sequelize models
import { Reservation, ReservationSpecialPricing, Listing, ListingData } from '../../models';
import moment from 'moment';
import * as config from '../../../config'
import { createReservationMessage } from '../../../core/thread/createReservationMessage'

import { emailBroadcast } from '../../../core/payment/email';
import { getBookedDates } from '../../../core/bookedDates';
import { getConflictingNFTsWithListing } from '../../../helpers/NFT/getConflictingNFTsWithListing';
import checkUserAuthentication from "../../../core/auth/checkUserAuthentication";
import getLocaleMessage from "../../../helpers/message/getLocaleMessage";
import { generateConfirmCode } from '../../../helpers/reservation/generateConfirmCode';
import { getServiceFee } from '../../../helpers/reservation/getServiceFee';
import { convert } from "../../../helpers/currencyConvertion";
import { getBaseAndRatesCurrency } from "../../../helpers/reservation/getBaseAndRatesCurrency";
import { calculateDiscount } from "../../../helpers/reservation/calculateDiscount";
import { getPriceForDaysWithSpecialPrice } from "../../../helpers/reservation/getPriceForDaysWithSpecialPrice";
import { generateReservationSpecialPriceDate } from '../../../helpers/reservation/generateReservationSpecialPriceDate'
const createReservation = {

  type: ReservationType,

  args: {
    listId: { type: new NonNull(IntType) },
    hostId: { type: new NonNull(StringType) },
    guestId: { type: new NonNull(StringType) },
    checkIn: { type: new NonNull(StringType) },
    checkOut: { type: new NonNull(StringType) },
    guests: { type: new NonNull(IntType) },
    message: { type: new NonNull(StringType) },
    basePrice: { type: new NonNull(FloatType) },
    cleaningPrice: { type: FloatType },
    currency: { type: new NonNull(StringType) },
    discount: { type: FloatType },
    discountType: { type: StringType },
    guestServiceFee: { type: FloatType },
    hostServiceFee: { type: FloatType },
    total: { type: new NonNull(FloatType) },
    bookingType: { type: StringType },
    paymentType: { type: IntType },
    paymentMethod: { type: IntType },
    cancellationPolicy: { type: IntType },
    specialPricing: { type: StringType },
    isSpecialPriceAssigned: { type: BooleanType },
    isSpecialPriceAverage: { type: FloatType },
    dayDifference: { type: FloatType },
    taxRate: { type : FloatType },
    checkInStart: { type: StringType },
    checkInEnd: { type: StringType },
    hostServiceFeeType: { type: StringType },
    hostServiceFeeValue: { type : FloatType },
  },

  async resolve({ request, response }, {
    listId,
    hostId,
    guestId,
    checkIn,
    checkOut,
    guests,
    message,
    basePrice,
    cleaningPrice,
    currency,
    discount,
    discountType,
    guestServiceFee,
    hostServiceFee,
    total,
    // bookingType,
    paymentType,
    cancellationPolicy,
    specialPricing,
    isSpecialPriceAssigned,
    isSpecialPriceAverage,
    dayDifference,
    taxRate,
    checkInStart,
    checkInEnd,
    hostServiceFeeType,
    hostServiceFeeValue,
    paymentMethod
  }) {
    try {
    // check Authentication and user ban status
      const { status, errorMessage } = await checkUserAuthentication(request);
      if(status!==200){
        return {
          status, errorMessage
        }
      }

      // return when user is admin
      if (request.user && request.user.admin){
        return {
          status: 400,
        };
      }
      const userId = request.user.id;
      let confirmationCode = generateConfirmCode();
      let reservationState = config.reservationState.PENDING;
      let totalConverted = 0, totalWithoutGuestFeeConverted = 0, cleaningPriceConverted = 0, discountConverted = 0, guestServiceFeeConverted = 0, hostServiceFeeConverted = 0;
      let convertSpecialPricing = [], averagePriceConverted = 0, specialPriceCollection = [];
      let listingBasePriceConverted = 0, listingCleaningPrice = 0
      let checkIsSpecialPriceAssigned = false;
      let specialPriceAverage = 0, priceForDaysConverted
      let priceForDaysWithSpecialPrice, priceForDaysWithSpecialPriceConverted;

      const checkInDate = moment(checkIn).format('YYYY-MM-DD');
      const checkOutDate = moment(checkOut).format('YYYY-MM-DD');

      /* =====START check valid booked dates=====*/
      const bookedDates = await getBookedDates({ listId, userId })
      const bookingDateRange = dateRange(checkIn, checkOut);


      let duplicateBookingDate = bookingDateRange.some(bookingDate => bookedDates.includes(bookingDate));
      if (duplicateBookingDate) {
        return {
          status:  400,
          errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.bookingDateBooked"})
        }
      }


      // get needed data, use Promise.all for performance
      const [ targetListing, targetListingData ] = await Promise.all([
                    Listing.findOne({
                      where: {
                        id: listId
                      },
                      raw: true
                    }),
                    ListingData.findOne({
                      where: {
                        listId
                      },
                      raw: true
                    }),
                  ]);
      let discountPercent = 0;
      if(bookingDateRange.length>=28 && targetListingData.monthlyDiscount){
        discountPercent = targetListingData.monthlyDiscount;
      }else if(bookingDateRange.length>=7 && targetListingData.weeklyDiscount){
        discountPercent = targetListingData.weeklyDiscount;
      }
      convertSpecialPricing = await generateReservationSpecialPriceDate(bookingDateRange, targetListingData, currency);

      const [baseCurrency, currencyRates] = await getBaseAndRatesCurrency();
      if(!targetListing){
        return {
          status: 400,
          errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.listingNotFound"})
        }
      }
      // Need to validate input with data in db, prevent request from out of website
      const isPayLater = Boolean(Number(paymentType) === Number(config.PAY_LATER_ID));
      if (isPayLater && !targetListing.isPayLater) {
        return {
          status: 400,
          errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.listingPayLaterInvalid"})
        }
      }
      // check price


      listingBasePriceConverted = convert(baseCurrency, currencyRates, targetListingData.basePrice, targetListingData.currency, currency)
      priceForDaysConverted = bookingDateRange.length * listingBasePriceConverted;

      // Calculate special price if exist and covert to GUEST currency
      const specialPriceObject = await getPriceForDaysWithSpecialPrice(bookingDateRange, targetListingData);
      priceForDaysWithSpecialPrice = specialPriceObject && specialPriceObject.total;
      checkIsSpecialPriceAssigned = specialPriceObject && specialPriceObject.isSpecialPriceAssigned;
      specialPriceAverage = specialPriceObject && specialPriceObject.isSpecialPriceAverage;
      priceForDaysWithSpecialPriceConverted = convert(baseCurrency, currencyRates, priceForDaysWithSpecialPrice, targetListingData.currency, currency);

      // Cleaning fee
      cleaningPriceConverted = convert(baseCurrency, currencyRates, cleaningPrice, targetListingData.currency, currency);
      //Discount
      discountConverted = await calculateDiscount({ priceForDays: priceForDaysWithSpecialPriceConverted, bookingDatesCount: bookingDateRange.length, weeklyDiscountPercent: targetListingData.weeklyDiscount, monthlyDiscountPercent: targetListingData.monthlyDiscount, })

      totalWithoutGuestFeeConverted = priceForDaysWithSpecialPriceConverted + cleaningPriceConverted - discountConverted;

      //Service fee
      const serviceFees = await getServiceFee(totalWithoutGuestFeeConverted, currency);
      guestServiceFeeConverted = serviceFees.guestFee;
      hostServiceFeeConverted = serviceFees.hostFee;

      totalConverted = totalWithoutGuestFeeConverted + guestServiceFeeConverted;

      //Fixed input to 2 digits
      const totalInputFixed = Number(total.toFixed(2));
      const discountInputFixed = Number(discount.toFixed(2));
      const cleaningPriceInputFixed = Number(cleaningPrice.toFixed(2));
      const hostServiceFeeInputFixed = Number(hostServiceFee.toFixed(2));
      const guestServiceFeeInputFixed = Number(guestServiceFee.toFixed(2));
      const isSpecialPriceAverageInputFixed = Number(Number(isSpecialPriceAverage).toFixed(2));
      const basePriceInputFixed = Number(basePrice.toFixed(2));

      //Fixed to 2 digits
      const totalWithoutGuestFeeConvertedFixed = Number(totalWithoutGuestFeeConverted.toFixed(2));
      const discountConvertedFixed = Number(discountConverted.toFixed(2));
      const cleaningPriceConvertedFixed = Number(cleaningPriceConverted.toFixed(2));
      const hostServiceFeeConvertedFixed = Number(hostServiceFeeConverted.toFixed(2));
      const guestServiceFeeConvertedFixed = Number(guestServiceFeeConverted.toFixed(2));
      const listingBasePriceConvertedFixed = Number(listingBasePriceConverted.toFixed(2));
      const specialPriceAverageFixed = Number(specialPriceAverage.toFixed(2));

      // check input
      if( totalInputFixed!==totalWithoutGuestFeeConvertedFixed || discountInputFixed !== discountConvertedFixed ||
          cleaningPriceInputFixed !== cleaningPriceConvertedFixed || hostServiceFeeInputFixed !== hostServiceFeeConvertedFixed ||
          guestServiceFeeInputFixed !== guestServiceFeeConvertedFixed || basePriceInputFixed !== listingBasePriceConvertedFixed ||
          isSpecialPriceAssigned !== checkIsSpecialPriceAssigned || isSpecialPriceAverageInputFixed !== specialPriceAverageFixed
      ){
          return {
            status: 400,
            errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.invalidInput"})
          }
      }

      /* =====END check payment later =====*/

      const { nftIds } = await getConflictingNFTsWithListing({ listId, checkIn: checkInDate, checkOut: checkOutDate })

      let theBookingType = targetListing.bookingType

      if (isPayLater || nftIds.length) {
        theBookingType = 'request'
      }

      const reservation = await Reservation.create({
        listId,
        hostId,
        guestId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        message,
        basePrice: listingBasePriceConvertedFixed,
        cleaningPrice: cleaningPriceConvertedFixed,
        currency,
        discount: discountConvertedFixed,
        discountType,
        guestServiceFee: guestServiceFeeConvertedFixed,
        hostServiceFee: hostServiceFeeConvertedFixed,
        total: totalWithoutGuestFeeConvertedFixed,
        confirmationCode,
        reservationState,
        paymentTypeId: paymentType,
        paymentMethodId: paymentMethod,
        cancellationPolicy,
        isSpecialPriceAverage: specialPriceAverageFixed,
        dayDifference,
        // taxRate,
        checkInStart,
        checkInEnd,
        hostServiceFeeType,
        hostServiceFeeValue,
        bookingType: theBookingType,
        isPayLater,
        discountPercent
      });

      if (reservation) {

        if (convertSpecialPricing && convertSpecialPricing.length > 0) {
          convertSpecialPricing.map(async (item, key) => {
            await ReservationSpecialPricing.create({
              listId,
              reservationId: reservation.id,
              blockedDates: moment(item.blockedDates).format('YYYY-MM-DD'),
              isSpecialPrice: item.isSpecialPrice
            });
          });
        }

        if (isPayLater) {
          createReservationMessage(reservation.id)
          emailBroadcast(reservation.id)
        }

        return reservation;
      } else {
        return {
          status: 500,
          errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.createReservationFail"})
        }
      }
    }catch (error) {
      console.log(error)
      return {
        status: 500,
        errorMessage: await getLocaleMessage({ locale: request.language, messageId: "error.something"}) + error.message
      }
    }

  },
};

export default createReservation;