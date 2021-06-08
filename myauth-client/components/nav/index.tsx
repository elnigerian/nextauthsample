import * as React from "react";
import Link from 'next/link';
import {useRouter} from "next/router";
import {useSession, signOut} from "next-auth/client";
import _ from 'lodash';

const defaultNavMenuCollection = [
    {item: 'How It Works', slug: 'how-it-works', url: '/how-it-works', asUrl: '/how-it-works', theme: 'default', active: true, role: 'link', authenticationRequired: false },
    {item: 'Features', slug: 'features', url: '/features', asUrl: '/features', theme: 'default', active: false, role: 'link', authenticationRequired: false},
    {item: 'Marketplace', slug: 'marketplace', url: '/marketplace', asUrl: '/marketplace', theme: 'default', active: false, role: 'link', authenticationRequired: false},
    {item: 'Products', slug: 'products', url: '/products', asUrl: '/products', theme: 'default', active: true, role: 'link', authenticationRequired: false},
    {item: 'Members', slug: 'members', url: '/members', asUrl: '/members', theme: 'default', active: true, role: 'link', authenticationRequired: false},
    {item: 'Users', slug: 'users', url: '/users', asUrl: '/users', theme: 'default', active: true, role: 'link', authenticationRequired: true},
    {item: 'Login', slug: 'signIn', url: '/auth/signIn', asUrl: '/signIn', theme: 'default', active: false, role: 'button'},
    {item: 'Logout', slug: 'signOut', url: '/auth/signOut', asUrl: '/signOut', theme: 'default', active: false, role: 'button'},
    {item: 'Get Started', slug: 'get-started', url: '/register', asUrl: '/register', theme: 'primary', active: true, role: 'button'},
];

type NavBarProps =  {
    navMenuItems ?: []
}

const DesktopNav: React.FunctionComponent<NavBarProps> = ({navMenuItems= defaultNavMenuCollection}) => {
    const router = useRouter();
    const [session, loading] = useSession();
    const [navMenuButtons, setNavMenuButtons] = React.useState([]);
    const [navMenuLinks, setNavMenuLinks] = React.useState([]);

    React.useEffect(() => {
        if(navMenuItems && navMenuItems.length > 0 ) {
            const navLinks = _.filter(navMenuItems, (item) =>  item.role === 'link' && !item.authenticationRequired);
            if (session) {
                const navButtons =  _.filter(navMenuItems, (item) => item.slug !== 'login' && item.role === 'button');
                setNavMenuButtons(navButtons);
                const authLinks = _.filter(navMenuItems, (item) =>  item.role === 'link' && item.authenticationRequired)
                navLinks.push(...authLinks);
            } else {
                const buttons =  _.filter(navMenuItems, (item) => item.slug !== 'logout' && item.role === 'button');
                setNavMenuButtons(buttons);
            }
            setNavMenuLinks(navLinks);
        }
    }, [navMenuItems, session]);

    return (
        <div>
            <div className='my-2 flex flex-row flex-no-wrap items-center justify-between'>
                <div className='flex flex-row flex-no-wrap items-end justify-between'>
                    <div className='mx-4 xl:mx-10'>
                        {''}
                        <Link href={{pathname: '/'}}>
                            <a><img className="h-6 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg" alt=""/> </a>
                        </Link>
                        {''}
                    </div>
                    <div className='ml-12 flex flex-row flex-no-wrap justify-between space-x-4 font-medium text-lg text-gray-900'>
                        {
                            navMenuLinks && navMenuLinks.length > 0 && navMenuLinks.map((menu: any, index: any) => {
                                const {item, url, asUrl, slug, active, role} = menu;
                                if (active && role === 'link') {
                                    return (
                                        <div key={slug + '-' + index}>
                                            <Link href={{pathname: url}} as={asUrl}>
                                                <a>{item} </a>
                                            </Link>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
                <div className='mx-10 flex flex-row flex-no-wrap justify-between space-x-5'>
                    <>
                    {
                        navMenuButtons && navMenuButtons.length > 0 && navMenuButtons.map((menu: any, index: any) => {
                            const {item, url, asUrl, slug, active, role, theme} = menu;
                            if (active && role === 'button') {
                                return (
                                    <div key={slug + '-' + index}>
                                        <button className={`w-48 h-12 cursor-pointer border-4 border-solid border-gray-600 rounded focus:outline-none`}
                                                onClick={() => router.push( url, asUrl)}>
                                            <a className={` text-center font-bold text-f7`}>{item} </a>
                                        </button>
                                    </div>
                                );
                            }
                        })
                    }
                    </>
                    <>
                        {
                            session ? (
                                    <div key={'logout'}>
                                        <button className={`w-48 h-12 cursor-pointer border-4 border-solid border-gray-600 rounded focus:outline-none`}
                                                onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
                                            <a className={` text-center font-bold text-f7`}>Logout </a>
                                        </button>
                                    </div>
                            ) : (
                                <div key={'login'}>
                                    <button className={`w-48 h-12 cursor-pointer border-4 border-solid border-gray-600 rounded focus:outline-none`}
                                            onClick={() => router.push( '/auth/signIn')}>
                                        <a className={` text-center font-bold text-f7`}>Login </a>
                                    </button>
                                </div>
                            )
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default DesktopNav;
