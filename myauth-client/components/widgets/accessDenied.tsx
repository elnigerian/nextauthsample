import * as React from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/client'

export default function AccessDenied () {
    return (
        <div className='container mx-auto my-8'>
            <h1 className='mb-4 font-bold text-4xl xl:text-6xl text-gray-800'>Access Denied</h1>
            <p className='font-medium text-2xl xl:text-4xl text-gray-600'>
                <Link href='/auth/signIn'>
                    <a>You must be signed in to view this page</a>
                </Link>
            </p>
        </div>
    )
}
