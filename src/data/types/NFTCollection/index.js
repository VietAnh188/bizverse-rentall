import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';
import { UserProfile } from '../../models';

const NFTCollectionType = new ObjectType({
    name: 'NFTCollectionType',
    fields:  {
        id: { type: IntType },
        userId: { type: StringType },
        name: { type: StringType },
        description: { type: StringType },
        coverImage: { type: StringType },
        avatar: { type: StringType },
        creator: {
            type: StringType,
            async resolve(collection) {
                const { userId } = collection;
                const user = await UserProfile.findOne({
                    where: {
                        userId
                    },
                    raw: true
                })

                if (!user) {
                    return 'unknown'
                }

                return user.displayName || ''
            }
        }
    }
})

export default NFTCollectionType