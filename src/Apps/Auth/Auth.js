import LoginLogo from "./Login/LoginLogo";
import React, {useEffect, useState} from "react";
import Login from "./Login/Login";
import Mobile from "./MobileCode/Mobile";
import ConfirmCode from "./MobileCode/ConfirmCode";

function Auth() {
    const [pageState,setPageState] = useState('login')
    const [authData,setAuthData] = useState({
        login:{},
        user:{},
    })


    const renderPage = () => {
        switch (pageState) {
            case "login":
                return <Login />;
            case "register":
                return <Mobile setAuthData={setAuthData} setPageState={setPageState}/>
            case "code":
                return <ConfirmCode authData={authData} setPageState={setPageState}/>;
            default:
                return null;
        }
    };
    useEffect(()=>{
        // console.log(authData)
    },[authData])

    return(
        <div className="container-fluid back h-100 ">
            <div className="row mb-5">
                <LoginLogo/>
            </div>
            {/*<div className=" justify-content-center d-flex flex-row">*/}
            {/*    <ToggleButtonGroup className='ltr-direction sansFont'*/}
            {/*                       color="primary"*/}
            {/*                       value={pageState}*/}
            {/*                       exclusive*/}
            {/*                       onChange={handleChange}*/}
            {/*                       aria-label="Platform">*/}
            {/*        <ToggleButton className='sansFont' value='login'>*/}
            {/*            ورود*/}
            {/*        </ToggleButton>*/}
            {/*        <ToggleButton className='sansFont' value='register'>ثبت نام</ToggleButton>*/}
            {/*    </ToggleButtonGroup>*/}
            {/*</div>*/}
            <div className='row p-1 h-100 '>
                <Login />
            </div>
        </div>

    )
}
export default Auth;