import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ModalsProvider } from '@mantine/modals';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  let SERVER_URI = process.env.SERVER_URI;

  const client = new ApolloClient({
    uri: SERVER_URI,
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
