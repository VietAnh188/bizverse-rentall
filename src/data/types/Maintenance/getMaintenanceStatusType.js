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

const WebMaintenanceStatusType = new ObjectType({
    name: "WebMaintenanceStatusType",
    fields: {
        active: {
            type: BooleanType
        },
        startTime: {
            type:StringType
        },
        endTime: {
            type:StringType
        }
    }
})
const MarketplaceMaintenanceStatusType = new ObjectType({
    name: "MarketplaceMaintenanceStatusType",
    fields: {
        active: {
            type: BooleanType
        },
        startTime: {
            type:StringType
        },
        endTime: {
            type:StringType
        }
    }
})
const AppMaintenanceStatusType = new ObjectType({
    name: "AppMaintenanceStatusType",
    fields: {
        active: {
            type: BooleanType
        },
        startTime: {
            type:StringType
        },
        endTime: {
            type:StringType
        }
    }
});
const GetMaintenanceResultType = new ObjectType({
    name: "GetMaintenanceResultType",
    fields: {
        web: {
            type: WebMaintenanceStatusType
        },
        marketplace: {
            type: MarketplaceMaintenanceStatusType
        },
        app: {
            type: AppMaintenanceStatusType
        }
    }
})
const GetMaintenanceStatusType = new ObjectType({
    name: 'GetMaintenanceStatusType',
    fields: {
        results: {
            type: GetMaintenanceResultType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    },
  });
  
export default GetMaintenanceStatusType;
  