'use client';
import React from "react";
import MobileInput from "@/components/Apps/Auth/Reusable/MobileInput";
// import URLs from "@/Resource/Net/URLs"; // For actual API endpoint

interface MobileProps {
    setAuthData: (data: any) => void;
    setPageState: (state: string) => void;
}

function MobileRegister({setAuthData, setPageState}: MobileProps) {
    const registerLinks = [
        // { href: getAddress('Login'), text: 'ورود.', isListItem: true },
        // { href: getAddress('Forget'), text: 'فراموشی رمز.', isListItem: true }
        { href: "/auth", text: 'ورود.', isListItem: true }, // Placeholder paths
        { href: "/auth/forget", text: 'فراموشی رمز.', isListItem: true } // Placeholder paths
    ];

    return (
        <MobileInput
            setAuthData={setAuthData}
            setPageState={setPageState}
            // apiEndpoint={URLs.auth.register.mobile} // Actual endpoint
            apiEndpoint={"/mock/auth/register/mobile"} // Placeholder endpoint
            successState="code"
            links={registerLinks}
        />
    );
}
export default MobileRegister;
