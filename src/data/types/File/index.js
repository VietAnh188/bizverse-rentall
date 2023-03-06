import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType
} from 'graphql';

const FileType = new ObjectType({
    name: 'FileType',
    fields:  {
        path: { type: StringType }
    }
})

export default FileType