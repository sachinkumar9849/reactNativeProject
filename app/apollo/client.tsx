import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Config from 'react-native-config';




const httpLink = createHttpLink({
  uri: Config.GRAPHQL_API_URL || 'https://jobklik-develop.mantraideas.com.np/api/v1/graphql',
});


export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

// Create an Apollo Provider component
export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};




// YO CODE AUTH FIX BHAYE PAXI KO LAGI 




// import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import Config from 'react-native-config';
// import AsyncStorage from '@react-native-async-storage/async-storage';


// const httpLink = createHttpLink({
//   uri: Config.GRAPHQL_API_URL || 'https://jobklik-develop.mantraideas.com.np/api/v1/graphql',
// });


// const authLink = setContext(async (_, { headers }) => {

//   const token = await AsyncStorage.getItem('userToken');
  
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });


// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-and-network',
//     },
//   },
// });


// export const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
//   return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };