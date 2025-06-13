'use client';
import React from "react";
import CodeVerificationInput from "@/components/Apps/Auth/Reusable/CodeVerificationInput";
// import URLs from "@/Resource/Net/URLs"; // For actual API endpoint

interface CodeProps {
    authData: any;
    setPageState: (state: string) => void;
}

function CodeForget({authData, setPageState}: CodeProps) {
    return (
        <CodeVerificationInput
            authData={authData}
            setPageState={setPageState}
            // apiEndpoint={URLs.auth.forget.confirm_code} // Actual endpoint
            apiEndpoint={"/mock/auth/forget/confirm_code"} // Placeholder
            successPageState="pass"
        />
    );
}
export default CodeForget;
