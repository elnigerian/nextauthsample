import * as React from 'react'
import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from '@apollo/client'
import merge from 'deepmerge'
import {isServer} from '../lib/isServer';
import fetch from 'isomorphic-unfetch';
import isEqual from 'lodash/isEqual';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export const uri = process.env.NODE_ENV === 'development' ?
    'http://localhost:4000/graphql' : 'https://localhost.herokuapp.com/graphql';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 *
 */
function createIsomorphicLink() {
    // todo - might need to set context, including passing the bearer token here.
    // if (isServer()) {
    //     const { SchemaLink } = require('@apollo/client/link/schema');
    //     const { schema } = require('./schema')
    //     return new SchemaLink({ schema })
    // } else {
        return new HttpLink({
            uri: 'http://localhost:4000/graphql',
            credentials: 'include',
            fetch
        });
    //}
}

const createHttpLink = () => new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' });

function createApolloClient() {
    return new ApolloClient<NormalizedCacheObject>({
        ssrMode: isServer(),
        link: createIsomorphicLink(),
        cache: new InMemoryCache(),
    })
}

export function initializeApollo(initialState: any = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // get hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        const existingCache = _apolloClient.extract();

        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter((d) =>
                    sourceArray.every((s) => !isEqual(d, s))
                ),
            ],
        });

        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (isServer()) return _apolloClient
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}

export function addApolloState(client, pageProps) {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }

    return pageProps
}

export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    return React.useMemo(() => initializeApollo(state), [state])
}