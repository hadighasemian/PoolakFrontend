import LoginLogo from "./Login/LoginLogo";
import React, {useEffect, useState} from "react";
import Login from "./Login/Login";
import Mobile from "./Register/Mobile";
import Code from "./Register/Code";

function Auth() {
    const [authData,setAuthData] = useState({
        login:{},
        user:{},
    })

    useEffect(()=>{
        // console.log(authData)
    },[authData])

    return(
        <div className="container-fluid back h-100 ">
            <div className="row mb-5">
                <LoginLogo/>
            </div>
            <div className='row p-1 h-100 '>
                <Login />
            </div>
        </div>

    )
}
export default Auth;