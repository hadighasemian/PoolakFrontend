import {useDispatch, useSelector} from "react-redux";
import {setAuthState} from "../DB/Redux/authSlice";
import {useNavigate} from "react-router-dom";
import getAddress from "../Routing/Addresses/getAddress";
import AuthModel from "../DB/Models/Auth/AuthModel";


const CheckAuthDataMiddleware = (useSWRNext) => (key, fetcher, config) => {

    // const navigate = useNavigate();
    // const {login} = AuthModel();


    // const swr = useSWRNext(key, fetcher, config)
    //
    // // if(!login?.login){
    // //     navigate(getAddress('login'),{replace:true})
    // // }
    // // if (swr.data?.data?.data?.authState?.login?.login){
    // //     return swr
    // //     // console.log(swr.data?.data?.data?.authState)
    // //     // const dispatch = useDispatch()
    // //     // dispatch(setAuthState(swr.data?.data?.data?.authState))
    // //     // ToLoginPage(swr.data?.data?.data?.authState?.login?.login)
    // // }
    // // navigate(getAddress('Splash'),{replace:true})
    // return swr
}
export default CheckAuthDataMiddleware;