import * as React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import StatusBar from "@/components/layout/statusBar";
import DesktopNav from "@/components/nav";

type LayoutProps = {
    children ?: any;
    options ?: any;
}

const Layout: React.FunctionComponent<LayoutProps> = ({children}: any) => {
    return (
        <div>
            <Header />
            <StatusBar />
            <div className=' xl:container mx-auto my-4 flex flex-col'>
                <DesktopNav />
                <div className='flex-grow'>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Layout;
