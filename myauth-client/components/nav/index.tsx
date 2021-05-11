import * as React from "react";
import Link from 'next/link';
import {useRouter} from "next/router";

const defaultNavMenuCollection = [
    {item: 'Products', slug: 'products', url: '/products', asUrl: '/products', theme: 'default', active: true, role: 'link'},
    {item: 'How It Works', slug: 'how-it-works', url: '/how-it-works', asUrl: '/how-it-works', theme: 'default', active: true, role: 'link'},
    {item: 'Features', slug: 'features', url: '/features', asUrl: '/features', theme: 'default', active: true, role: 'link'},
    {item: 'Marketplace', slug: 'marketplace', url: '/marketplace', asUrl: '/marketplace', theme: 'default', active: true, role: 'link'},
    {item: 'Company', slug: 'company', url: '/company', asUrl: '/company', theme: 'default', active: true, role: 'link'},
    {item: 'Login', slug: 'login', url: '/auth/login', asUrl: '/login', theme: 'default', active: true, role: 'button'},
    {item: 'Get Started', slug: 'get-started', url: '/register', asUrl: '/register', theme: 'primary', active: true, role: 'button'},
];

type NavBarProps =  {
    navMenuItems ?: []
}

const DesktopNav: React.FunctionComponent<NavBarProps> = ({navMenuItems= defaultNavMenuCollection}) => {
    const router = useRouter();

    return (
        <div>
            <div className='my-2 flex flex-row flex-no-wrap items-center justify-between'>
                <div className='flex flex-row flex-no-wrap items-end justify-between'>
                    <div className='mx-10'>
                        {''}
                        <Link href={{pathname: '/'}}>
                            <a><img className="h-6 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg" alt=""/> </a>
                        </Link>
                        {''}
                    </div>
                    <div className='ml-12 flex flex-row flex-no-wrap justify-between space-x-4 font-medium text-lg text-gray-900'>
                        {
                            navMenuItems && navMenuItems.length > 0 && navMenuItems.map((menu: any, index: any) => {
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
                    {
                        navMenuItems && navMenuItems.length > 0 && navMenuItems.map((menu: any, index: any) => {
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
                </div>
            </div>
        </div>
    )
}

export default DesktopNav;
