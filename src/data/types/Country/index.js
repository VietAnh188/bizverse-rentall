import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType
} from 'graphql';

const CountryType = new ObjectType({
    name: 'CountryType',
    fields:  {
        id: { type: IntType },
        countryCode: { type: StringType },
        countryName: { type: StringType },
        dialCode: { type: StringType },
        isEnable: { type: BooleanType },
    }
})

export default CountryType