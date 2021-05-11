import * as React from "react";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/client";

const SignOut = () => {
    return (
        <>
            <p>Signing you out</p>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { req, res } = context;
    const session = await getSession({ req });

    return {
        props: {}
    }
}

export default SignOut;
