import { getRange, getDateUsingTimeZone }  from './dateRange'
import moment  from 'moment'
//Discount calculation
export function getPriceWithDiscount({ basePrice, discount, nights }) {
  if (discount > 0) {
    let singleNightDiscount = discount / nights;
    basePrice = basePrice - singleNightDiscount;
  }
  return basePrice;
}

export function getFixedValue(value) {
  if (!value) return value;
  return Number(value.toFixed(2))
}

export function cancellationGuestData(remainingNights,
  nights,
  priceForDays,
  accomodation,
  isCleaingPrice,
  taxRate,
  guestServiceFee,
  guestFees,
  discount,
  hostServiceFee,
  basePrice, // Either special price average or base price from reserveration with discount is set
  total,
  policyName,
  interval,
  priorDays,
  nonRefunableNights,
  hostServiceFeeType,
  hostServiceFeeValue,
  currency,
  base,
  rates,
  serviceFees,
  cleaningFeePercent,
  refundNighWithSpecialPrice = 0
  ) {

  let refundableNightPrice = 0, nonRefundableNightPrice = 0, refundWithoutGuestFee = 0;
  let updatedHostFee = 0, payoutToHost = 0, hostRefund = 0;
  let checkInNights = (remainingNights === 0 || remainingNights > 0) ? remainingNights : nights;
  let totalNights = checkInNights - nonRefunableNights;

  //Based on the policy, update the guest fee
  let updatedGuestFee = (guestServiceFee * (guestFees / 100)), //This variable stores refunded guest fee value.
    paidAmount = total + guestServiceFee;

  //Based on the policy, update the cleaning price
  isCleaingPrice = (isCleaingPrice * (cleaningFeePercent / 100));

  //Refund amount without considering guest service fee
  refundableNightPrice = ((refundNighWithSpecialPrice - discount)* (accomodation / 100)) + isCleaingPrice;

  //Host Payout amount without subtracting host service fee. total has cleaning Fee with in it.
  hostRefund = total - refundableNightPrice;

  //Adding guest service fee, if it could be refunded
  refundableNightPrice = refundableNightPrice + updatedGuestFee;

  //Payout amount calculated with host service fee
  if (hostRefund > 0) {
    updatedHostFee = hostServiceFeeType === 'percentage' ? hostRefund * (Number(hostServiceFeeValue) / 100) : hostServiceFeeValue;
    payoutToHost = hostRefund - updatedHostFee;
  }

  //Non refundable amount calculated based on the total amount guest paid and the refundable amount with guest service fee
  nonRefundableNightPrice = paidAmount - refundableNightPrice;

  return {
    refundableNightPrice,
    refundWithoutGuestFee,
    nonRefundableNightPrice,
    //If this updatedGuestFee with in object is 0, admin won't get guest service fee after cancellation
    updatedGuestFee: guestServiceFee - updatedGuestFee, //Either whole guest service is refunded or none based on the policy
    payoutToHost,
    updatedHostFee
  };
}

export function calculateHostCancellation({
  total,
  basePrice, // Either special price average or base price from reserveration with discount is set
  isCleaingPrice,
  nights,
  remainingNights,
  guestServiceFee, //Guest service fee value, when the reservation is created
  hostServiceFee,  //Host service fee value, when the reservation is created
  hostServiceFeeType, //Host service fee set by admin at the time of creating reservation
  hostServiceFeeValue, //Host service fee type set by admin at the time of creating reservation
  interval
}) {
  let refundAmount = 0, nonPayoutAmount = 0, payoutAmount = 0, hostRefund = 0, refundDays = nights;
  let updatedHostFee = hostServiceFee, updatedGuestFee = guestServiceFee;

  //If the cancellation is done after or during check in date
  if (interval <= 0 && remainingNights < nights) {
    refundDays = remainingNights;
    isCleaingPrice = 0;
    guestServiceFee = 0;
  }

  //Refund amount to guest
  refundAmount = getFixedValue((refundDays * basePrice) + isCleaingPrice);

  //Host Payout amount without subtracting host service fee. total has cleaning Fee with in it.
  hostRefund = getFixedValue(total - refundAmount);

  //Payout amount calculated with host service fee
  if (hostRefund > 0) {
    nonPayoutAmount = refundAmount; //guest service fee and cleaning fee won't be here
    //New host service fee calculated based on the host refund amount.
    updatedHostFee = getFixedValue(hostServiceFeeType === 'percentage' ? hostRefund * (Number(hostServiceFeeValue) / 100) : hostServiceFeeValue);
    payoutAmount = getFixedValue(hostRefund - updatedHostFee);
  }
  else {
    //Payout amount of host is zero
    nonPayoutAmount = getFixedValue(total - updatedHostFee);
    updatedGuestFee = 0; //Guest fee refunded
    updatedHostFee = 0;
  }

  //Adding guest service fee, if it could be refunded
  refundAmount = refundAmount + guestServiceFee;

  return {
    refundAmount,
    nonPayoutAmount,
    payoutAmount,
    refundDays,
    updatedHostFee,
    updatedGuestFee //If this value is 0, admin won't get guest service fee after cancellation
  };
}

export const getRefundDateWithSpecialPrice = (refundSpecialPrice) => {
    return refundSpecialPrice.reduce((pre, current) => current.isSpecialPrice + pre, 0)
}