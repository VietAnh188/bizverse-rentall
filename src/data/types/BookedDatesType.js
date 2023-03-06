import {
	GraphQLObjectType as ObjectType,
	GraphQLList as List,
	GraphQLString as StringType,
	GraphQLInt as IntType,
} from 'graphql';

const BookedDatesType = new ObjectType({
	name: 'BookedDates',
	fields: {
		bookedDates: {
			type: new List(StringType)
		},
		status: {
			type: IntType
		},
		errorMessage: {
			type: StringType
		}
	}
});

export default BookedDatesType;