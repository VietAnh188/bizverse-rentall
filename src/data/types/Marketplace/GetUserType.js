import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';

const SocialUserType = new ObjectType({
    name: 'SocialUserType',
    fields:  {
        username: {
            type: StringType
        },
        email: {
            type: StringType
        },
        name: {
            type: StringType
        },
        first_name: {
            type: StringType
        },
        last_name: {
            type: StringType
        },
        gender: {
            type: StringType
        },
        avatar: {
            type: StringType
        },
        cover: {
            type: StringType
        },
        is_pro: {
            type: StringType
        },
        language: {
            type: StringType
        },
        verified: {
            type: StringType
        },
        lastseen: {
            type: StringType
        },
        address: {
            type: StringType
        },
        about: {
            type: StringType
        },
        avatar_3d: {
            type: StringType
        },
        half_body_avartar3d: {
            type: StringType
        },
        access_token: {
            type: StringType
        }
    }
})

const GetUserType = new ObjectType({
    name: 'GetUserType',
    fields: {
        results: {
            type: SocialUserType
        },
        status:{
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default GetUserType;
