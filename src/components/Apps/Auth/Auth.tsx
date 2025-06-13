'use client';
import React, {useEffect, useState} from "react";
import LoginLogo from "./Login/LoginLogo"; // Import migrated component
import Login from "./Login/Login";       // Import migrated component

interface AuthData {
    login?: any;
    user?: any;
}

function Auth() {
    const [authData, setAuthData] = useState<AuthData>({
        login:{},
        user:{},
    });

    useEffect(()=>{
        // console.log(authData)
    },[authData]);

    return(
        <div className="container-fluid back h-100 "> {/* Assuming 'back' class is global or defined in AuthLayout's CSS */}
            <div className="row mb-5 justify-content-center"> {/* Added justify-content-center for logo */}
                <LoginLogo/>
            </div>
            <div className='row p-1 h-100 '>
                <Login />
            </div>
        </div>
    );
}
export default Auth;
