'use client';
import React, {useEffect, useState} from "react";
import MobileRegister from "./Mobile";
import CodeRegister from "./Code";     // Import migrated CodeRegister
import LoginLogo from "../Login/LoginLogo";
import Name from "./Name";           // Import migrated Name

interface AuthData {
    login?: any;
    user?: any;
}

function Register() {
    const [pageState, setPageState] = useState('mobile');
    const [authData, setAuthData] = useState<AuthData>({
        login:{},
        user:{},
    });

    const renderPage = () => {
        switch (pageState) {
            case "mobile":
                return <MobileRegister setAuthData={setAuthData} setPageState={setPageState}/>;
            case "code":
                return <CodeRegister authData={authData} setPageState={setPageState}/>;
            case "name":
                return <Name authData={authData} setPageState={setPageState}/>;
            default:
                return <p>Unknown registration state: {pageState}</p>;
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
export default Register;
