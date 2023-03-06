import moment from 'moment';

// GraphQL
import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLObjectType as ObjectType,
    GraphQLBoolean as BooleanType
} from 'graphql';
import { dateRange, getBookedDatesFromReservation } from '../../../../core/bookedDates';

// Models
import { NFT } from '../../../models';

const marketplace_checkNFTAvailable = {
    type: new ObjectType({
        name: "marketplace_checkNFTAvailableType",
        fields: {
            status: { type: IntType },
            errorMessage: { type: StringType },
            results: {
                type: new ObjectType({
                    name: "marketplace_checkNFTAvailableResults",
                    fields: {
                        isValid: {
                            type: BooleanType
                        }
                    }
                })
            }
        }
    }),
    args: {
        id: { type: new NonNull(IntType) }
    },
    async resolve({ request }, {
        id
    }){
        try  {
            const nft = await NFT.findOne({
                where: {
                    id,
                    isDeleted: false,
                    isSelling: true,
                    offerId: {
                        $not: null
                    },
                    currentPrice: {
                        $not: null
                    }
                },
                raw: true
            })
            
            if (nft) {
                if (moment(nft.checkOut).isBefore()) {
                    return {
                        status: 400,
                        errorMessage: "NFT is expired"
                    }
                }

                if (nft.originalOwner === nft.owner) {
                    // check conflict with reservation 
                    let bookedDates = await getBookedDatesFromReservation({
                        listId: nft.listId, 
                        isPaid: true
                    });
                    let nftDateRange = dateRange(nft.checkIn, nft.checkOut);
                    const isConflictNFTBookingDates = nftDateRange.some(nftDate=> bookedDates.includes(nftDate));

                    if (isConflictNFTBookingDates) {
                        return {
                            status: 400,
                            errorMessage: 'NFT dates is conflicting with the existing booking dates'
                        }
                    }
                }

                if (nft.inTransaction) {
                    return {
                        status: 400,
                        errorMessage: "NFT is in another transaction"
                    }
                }

               return {
                    status: 200,
                    results: {
                        isValid: true
                    }
                }    
            } else {
                return {
                    status: 400,
                    results: {
                        isValid: false
                    }
                }
            }
           
        } catch (error) {
            return {
                status: 400,
                errorMessage: 'Something went wrong' + error.message
            }
        }
    }
}

export default marketplace_checkNFTAvailable;