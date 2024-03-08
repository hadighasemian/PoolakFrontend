import React, {useEffect, useState} from "react";
import Mobile from "./Mobile";
import Code from "./Code";
import LoginLogo from "../Login/LoginLogo";
import Name from "./Name";


function Register() {
    const [pageState,setPageState] = useState('mobile')
    const [authData,setAuthData] = useState({
        login:{},
        user:{},
    })


    const renderPage = () => {
        switch (pageState) {
            case "mobile":
                return <Mobile setAuthData={setAuthData} setPageState={setPageState}/>;
            case "code":
                return <Code  authData={authData} setPageState={setPageState}/>
            case "name":
                return <Name  authData={authData} setPageState={setPageState}/>
            default:
                return null;
        }
    };

    return(
        <div className="container-fluid back h-100 ">
            <div className="row mb-5">
                <LoginLogo/>
            </div>
            <div className='row p-1 h-100 '>
                {renderPage()}
            </div>
        </div>
    )
}
export default Register;