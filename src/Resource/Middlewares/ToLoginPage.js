
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const ToLoginPage = (loginFlag) => {
    const navigate = useNavigate();
    useEffect(()=>{
        // console.log('login flag',loginFlag)
        if (loginFlag===false){
            navigate('/Auth', { replace: true });
        }
    },[loginFlag])

};

export default ToLoginPage;
