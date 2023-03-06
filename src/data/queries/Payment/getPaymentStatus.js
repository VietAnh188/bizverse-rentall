import {
    GraphQLString as StringType
} from 'graphql'; 
import GetOnefinPaymentStatusType from '../../types/GetOnefinPaymentStatusType';
import httpStatus from 'http-status';
import { Transaction } from '../../models';
import checkTransaction from './checkTransaction'
import { handleOnPaymentSuccess } from '../../../core/payment/handleOnPaymentSuccess'

const getOneFinPaymentStatus = {
    type: GetOnefinPaymentStatusType,
    args: {
        trxRefNo: { type: StringType}
    },

    async resolve({ request }, { trxRefNo }) {
        try {
            if (request.user && !request.user.admin) {
                const checkTrans = await checkTransaction(trxRefNo)
                const targetTransaction = await Transaction.findOne({
                    where: {
                        transactionId: trxRefNo
                    },
                    raw: true
                })

                if (!targetTransaction) {
                    return {
                        status: 400,
                        errorMessage: 'Transaction is not existing'
                    }
                }
                
                if (checkTrans) {
                    let statusUpdate;
                    let isSuccess = false;
                    let reservationState;
                    const reservationId = targetTransaction.reservationId;

                    switch(Number(checkTrans.statusId)){
                        case 100: {
                            // giao dich thanh cong
                            statusUpdate = 'APPROVED';
                            isSuccess = true;
                            break;
                        }
                        case 102: {
                            // giao dich that bai
                            statusUpdate = 'DECLINED'
                            break;
                        }
                        case 104: {
                            // giao dich da duoc xu ly tanh cong va khong the vo hieu hoa giao dich
                            statusUpdate = 'SETTLED'
                            isSuccess = true;
                            break;
                        }
                        case 105: {
                            // giao dich bi huy
                            statusUpdate = 'CANCELLED'
                            break;
                        }
                        case 106: {
                            // giao dich dang cho  phan hoi tu phia doi tac
                            statusUpdate = 'OPENED'
                            isSuccess = true; // TODO: should be check transaction again
                            break;
                        }
                        case 107:{
                            statusUpdate = 'VOIDED'
                            // giao dich vo hieu thanh cong
                            break;
                        }
                        default: {
                            // statusUpdate = 'OPENED'
                            // reservationState = 'pending'
                        }
                    }

                    Transaction.update({
                        status: statusUpdate
                    }, {
                        where: {
                            id: targetTransaction.id
                        }
                    })

                    if (isSuccess) {
                        const { reservationState: nextReservationState } = await handleOnPaymentSuccess({
                            reservationId,
                            ignoreTransaction: true
                        })

                        reservationState = nextReservationState
                    }
                    
                    return {
                        status: isSuccess ? httpStatus.OK : httpStatus.BAD_REQUEST,
                        results: {
                            ...checkTrans,
                            reservationState
                        }
                    }
                } else {
                    return {
                        status: httpStatus.BAD_REQUEST,
                        errorMessage: "The transaction no is not valid"
                    }
                }
                
            } else {
                return {
                    status: 500,
                    errorMessage: 'You must login to get your profile information.'
                }
            }
        } catch (error) {
            console.log("------------------------------------------------- payment status error ----------------", JSON.stringify(error))
            return {
                errorMessage: 'Something went wrong: ' + error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }
};

export default getOneFinPaymentStatus;
