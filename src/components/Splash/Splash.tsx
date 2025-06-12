'use client'; // Add 'use client' for hooks like useEffect and useRouter (next/navigation)

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Replaced useNavigate with useRouter from next/navigation
// import SplashLogo from "./SplashLogo"; // Needs migration
// import authModel from "../../Resource/DB/Models/Auth/AuthModel"; // Needs migration and path update
// import getAddress from "../../Resource/Routing/Addresses/getAddress"; // Needs migration and path update

function Splash() {
    // const {login,user} = authModel() // Commented out, needs migration
    const router = useRouter();

    useEffect(()=>{
        // Mock logic for now, original logic depends on migrated authModel and getAddress
        const isLoggedIn = false; // Placeholder for login?.login === true
        if (isLoggedIn){
            router.replace('/home'); // Placeholder for getAddress('Home')
        }else{
            router.replace('/auth'); // Placeholder for getAddress('Login')
        }
    // },[login]) // login dependency removed for now
    },[router])



    return(
        <div className="container-fluid p-0 borderr">
            <header className="row h-25">
                {/* <SplashLogo></SplashLogo> */} {/* SplashLogo commented out */}
                <h1>Splash Page Content</h1> {/* Placeholder content */}
            </header>
        </div>
    );
}
export default Splash;
