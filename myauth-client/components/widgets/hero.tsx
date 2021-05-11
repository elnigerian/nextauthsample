import * as React from "react";
import {useRouter} from "next/router";
import {Browser} from "@/components/icons";

type HeroProps =  {

}
const Hero = ({
                  title = 'Your Best Value Prop',
                  content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                  btnCaption='Start Free Trial', linkPath='/register', shallow, imageIcon, imageAlt}: any) => {
        const router = useRouter();
        const shallowRoute = !!shallow;
        return (
            <div className='my-10 flex flex-row flex-no-wrap'>
                <div className='w-7/12 p-4 flex flex-col flex-no-wrap justify-center'>
                    <div className='ml-12 flex flex-col flex-no-wrap items-start justify-start'>
                        <div className='w-10/12 min-w-1/2'>
                            <p className='font-bold text-6xl text-gray-800'>{title} </p>
                        </div>
                        <div className='w-10/12 my-4 py-2'>
                            <p className='font-medium text-4xl text-gray-500'> {content} </p>
                        </div>
                        <div>
                            {
                                btnCaption && linkPath && (
                                    <button className='w-40 h-12 cursor-pointer border-4 border-solid border-gray-600 rounded focus:outline-none'
                                            onClick={() => router.push(linkPath, linkPath, { shallow: shallowRoute })}>
                                        {btnCaption}
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
                <div className='w-7/12 p-4 flex place-content-center'>
                    <Browser />
                </div>
            </div>
        );
}

export default Hero;
