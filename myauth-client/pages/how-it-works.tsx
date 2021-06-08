import * as React from 'react';
import Layout from "@/components/layout/layout";
import {Browser} from "@/components/icons";

const HowItWorks = ({
                        title = 'This Is How It Works',
                        content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }) => {
    return (
        <Layout>
            <div className='w-11/12 mx-auto my-10 p-4 flex flex-col flex-no-wrap items-center'>
                <div className='ml-12 flex flex-col flex-no-wrap items-center justify-items-center'>
                    <div className='w-10/12 min-w-1/2'>
                        <p className='text-center font-bold text-4xl xl:text-6xl text-gray-800'>{title} </p>
                    </div>
                    <div className='w-10/12 my-4 py-2'>
                        <p className='text-center font-medium text-2xl xl:text-4xl text-gray-500'> {content} </p>
                    </div>
                </div>
                <div className=''>
                    <Browser width={'1000'} height={'716'}/>
                </div>
            </div>
        </Layout>
    );
};

export default HowItWorks;