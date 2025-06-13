'use client';
import React, {useEffect, useState} from "react";
import LoginLogo from "../Login/LoginLogo";
import MobileForget from "./Mobile";
import CodeForget from "./Code";               // Import migrated CodeForget
import Pass from "./Pass";                   // Import migrated Pass

interface AuthData {
    login?: any;
    user?: any;
}

function Forget() {
    const [pageState, setPageState] = useState('mobile');
    const [authData, setAuthData] = useState<AuthData>({
        login:{},
        user:{},
    });

    const renderPage = () => {
        switch (pageState) {
            case "mobile":
                return <MobileForget setAuthData={setAuthData} setPageState={setPageState}/>;
            case "code":
                return <CodeForget authData={authData} setPageState={setPageState}/>;
            case "pass":
                return <Pass authData={authData} setPageState={setPageState}/>;
            default:
                return <p>Unknown forget password state: {pageState}</p>;
        }
    };

    return(
        <div className="container-fluid back h-100 ">
            <div className="row mb-5 justify-content-center">
                <LoginLogo/>
            </div>
            <div className='row p-1 h-100 '>
                {renderPage()}
            </div>
        </div>
    );
}
export default Forget;
