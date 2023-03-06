import ApolloClient from 'apollo-client';

export const client = new ApolloClient({
    uri: 'http://52.221.163.65:8000/subgraphs/name/bizverse/rental/graphql',
    // cache: new InMemoryCache()
});