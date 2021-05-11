import * as React from "react";

type StatusBarProps = {
    message ?: string;
}

const StatusBar:React.FunctionComponent<StatusBarProps> = ({message= 'This is the status bar!'}) => {
    const statusMessage = message ? message : '';
    return (
        <>
            <div className='bg-black h-8 flex flex-row flex-no-wrap items-center justify-center'>
                <div className='max-w-screen-xl mx-auto'>
                    <p className='font-sans text-sm text-white text-center'> {statusMessage} </p>
                </div>
            </div>
        </>
    );
}

export default StatusBar;
