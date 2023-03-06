import {
    GraphQLObjectType as ObjectType,
    GraphQLID as ID,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
} from 'graphql';
import ReservationType from './ReservationType';

const ChangeReservationType = new ObjectType({
    name: 'ChangeReservationType',
    fields: {
        results: {
			type: ReservationType
		},
		status: {
			type: IntType
		},
        errorMessage: { 
            type: StringType
        }
    }
});

export default ChangeReservationType;