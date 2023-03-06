import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLNonNull as NonNull,
    GraphQLFloat as FloatType,
    GraphQLInt as IntType,
    GraphQLID as ID,
    GraphQLBoolean as BooleanType,
    GraphQLEnumType as EnumType
  } from 'graphql';

export const MaintenanceType = new ObjectType({
    name: 'MaintenanceType',
    fields: {
      id: { type: ID },
      active: { type: BooleanType },
      type: { type: StringType },
      startTime: { type: StringType },
      endTime: { type: StringType },
      description: { type: StringType },
    },
  });
export const MaintenanceEnumType = new EnumType({
    name: "MaintenanceEnumType",
    values : {
        web: {
            value: "web"
        },
        marketplace: {
            value: "marketplace"
        }
    }
})
const MaintenanceCommonType = new ObjectType({
    name: 'MaintenanceCommonType',
    fields: {
        results: {
            type: MaintenanceType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    },
  });

export default MaintenanceCommonType;
