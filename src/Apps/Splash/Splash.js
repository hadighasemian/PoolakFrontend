import SplashLogo from "./SplashLogo";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import authModel from "../../Resource/DB/Models/Auth/AuthModel";
import getAddress from "../../Resource/Routing/Addresses/getAddress";


function Splash() {
    const {login,user} = authModel()
    const navigate = useNavigate();

    // const { data, loading, error } = useSwrPost(URLs['check token'],
    //     {'name':'hadi'}, createSwrConf(true,1000));


    //
    useEffect(()=>{
        if (login?.login===true){
            navigate(getAddress('Home'), { replace: true });
        }else{
            navigate(getAddress('Login'), { replace: true });
        }
    },[login])



    return(
        <div className="container-fluid p-0 borderr">
            <header className="row h-25">
                <SplashLogo></SplashLogo>
            </header>
        </div>
    );
}
export default Splash;