import * as React from 'react';
import {ApolloProvider} from '@apollo/client';
import {Provider as NextAuthProvider} from 'next-auth/client';
import {useApollo} from '../apollo/client';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
    const apolloClient = useApollo(pageProps);
    return (
        <NextAuthProvider session={pageProps.session}>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </NextAuthProvider>
    );
}

export default MyApp
