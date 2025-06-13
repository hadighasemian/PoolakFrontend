'use client';
import React from "react";
import MobileInput from "@/components/Apps/Auth/Reusable/MobileInput";
// import URLs from "@/Resource/Net/URLs"; // For actual API endpoint

interface MobileProps {
    setAuthData: (data: any) => void;
    setPageState: (state: string) => void;
}

function MobileForget({setAuthData, setPageState}: MobileProps) {
    const forgetLinks = [
        // { href: getAddress('Login'), text: 'ورود.', isListItem: true },
        // { href: getAddress('Register'), text: 'ثبت نام.', isListItem: true }
        { href: "/auth", text: 'ورود.', isListItem: true }, // Placeholder paths
        { href: "/auth/register", text: 'ثبت نام.', isListItem: true } // Placeholder paths
    ];

    return (
        <MobileInput
            setAuthData={setAuthData}
            setPageState={setPageState}
            // apiEndpoint={URLs.auth.forget.mobile} // Actual endpoint
            apiEndpoint={"/mock/auth/forget/mobile"} // Placeholder endpoint
            successState="code"
            links={forgetLinks}
        />
    );
}
export default MobileForget;
