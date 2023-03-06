import {
	GraphQLObjectType as ObjectType,
	GraphQLFloat as FloatType,
	GraphQLInt as IntType,
	GraphQLBoolean as BooleanType,
} from 'graphql';


const RefundDataType = new ObjectType({
	name: 'RefundDateType',
	fields: {
		hostServiceFee: {
			type: FloatType
		},
		guestServiceFee: {
			type: FloatType
		},
		refundToGuest: {
			type: FloatType
		},
		payoutToHost: {
			type: FloatType
		},
        total: {
			type: FloatType
        },
		remainingNights: {
			type: IntType
		},
		spentNights: {
			type: IntType
		},
		totalNights: {
			type: IntType
		},
		missedEarning: {
			type: FloatType
		},
		canCancel: {
			type: BooleanType
		},
		nonRefundToGuest: {
			type: FloatType
		}
	}
});

export default RefundDataType;