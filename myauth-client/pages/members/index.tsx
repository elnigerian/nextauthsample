import * as React from "react";
import Layout from "@/components/layout/layout";
import {useSession} from "next-auth/client";
import AccessDenied from "@/components/widgets/accessDenied";

type MemberProps = {
    contentMessage?: string;
    options?: any;
}

const Members: React.FunctionComponent<MemberProps> = ({contentMessage = 'This is the default message!'}) => {
    const [ session, loading ] = useSession()
    const [ content , setContent ] = React.useState()

    // Fetch content from protected route
    React.useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('/api/members/protected')
            const json = await res.json()
            if (json.content) { setContent(json.content) }
        }
        fetchData();
    },[session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    // If no session exists, display access denied message
    if (!session) { return  <Layout><AccessDenied/></Layout> }
    return (
        <Layout>
            <div className='w-11/12 mx-auto my-10'>
                <h1>Protected Page</h1>
                <p>{content}</p>
            </div>
        </Layout>
    )
}

export default Members;
