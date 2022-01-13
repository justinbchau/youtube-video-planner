import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ModalsProvider } from '@mantine/modals';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <ModalsProvider>
        <Component {...pageProps} />
      </ModalsProvider>
    </ApolloProvider>
  )
}

export default MyApp
