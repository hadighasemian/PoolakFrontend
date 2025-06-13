'use client';
import React from "react";
import CodeVerificationInput from "@/components/Apps/Auth/Reusable/CodeVerificationInput";
// import URLs from "@/Resource/Net/URLs"; // For actual API endpoint

interface CodeProps {
    authData: any;
    setPageState: (state: string) => void;
}

function CodeRegister({authData, setPageState}: CodeProps) {
    return (
        <CodeVerificationInput
            authData={authData}
            setPageState={setPageState}
            // apiEndpoint={URLs.auth.register.confirm_code} // Actual endpoint
            apiEndpoint={"/mock/auth/register/confirm_code"} // Placeholder
            successPageState="name"
        />
    );
}
export default CodeRegister;
