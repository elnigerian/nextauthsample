import * as React from 'react';
import {GetServerSideProps} from 'next';
import {getSession, useSession} from 'next-auth/client';
import Layout from '@/components/layout/layout';
import {toCapitalize} from '../../lib/toCapitalize';
import AccessDenied from '@/components/widgets/accessDenied';
import {GetAllUsersDocument, useGetAllUsersQuery} from '../../generated/apolloComponents';
import {addApolloState, initializeApollo} from "../../apollo/client";

// const fetcher = (query) =>
//     fetch('/api/graphql', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json',
//         },
//         body: JSON.stringify({ query }),
//     })
//         .then((res) => res.json())
//         .then((json) => json.data)

const Users = () => {
    const [ session, loading ] = useSession()
    const { data, loading: usersLoading, error } = useGetAllUsersQuery();

    if (!session) { return  <Layout><AccessDenied /></Layout> }
    if (error) return <div>Failed to load</div>
    if (!data || usersLoading) return <div>Loading...</div>

    const  users = data && data.getAllUsers ? data.getAllUsers : [];

    return (
        <Layout>
            <div className='w-11/12 xl:container mx-auto my-12'>
                <p className='font-medium text-2xl xl:text-4xl text-gray-700 mb-2'>Our team members/users include: </p>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {users.map((user, i) => (
                        <li key={i} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                            <div className="w-full flex items-center justify-between p-6 space-x-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-gray-900 text-sm font-medium truncate">{toCapitalize(user.firstName)} {toCapitalize(user.lastName)}</h3>
                                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                            {user.lastName.toLowerCase() === 'bond' ? 'Agent' : 'Other'}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-gray-500 text-sm truncate">Her Royal Majesty's Secret Service</p>
                                </div>
                                <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=qjUTqa8Uxm&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                     alt="" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const {req, res } = context
    const session = await getSession({ req });
    if (!session) {
        res.statusCode = 403;
        return { props: { users: [] } };
    }

    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: GetAllUsersDocument,
    })

    return addApolloState(apolloClient, {
        props: {},
    })
}

export default Users;