import useSWR from "swr";
import createSwrConf from "./Swr/createSwrConf";
import getConfiguredAxis from "./CreateAxiosInstance";
import AuthModel from "../DB/Models/Auth/AuthModel";
import getAddress from "../Routing/Addresses/getAddress";
import {useNavigate} from "react-router-dom";

const useSwrPost = (url, postedData={},swrOptions=createSwrConf(),setAuthData=false,checkAuthData=false) => {
    const axiosInstance = getConfiguredAxis(AuthModel());
    const {login} = AuthModel();
    const navigate = useNavigate();
    const fetcher = (address,postedData) => axiosInstance.post(address,postedData);
    if(checkAuthData){
        if(!login?.login){
            navigate(getAddress('login'),{replace:true})
        }
    }
    const { data:response, loading, error } = useSWR(url, (url) => fetcher(url, postedData), swrOptions);
    // if(setAuthData){
    //     // console.log(data?.data?.data?.authState)
    //     dispatch(setAuthState(data?.data?.data?.authState))
    // }

    return { response, loading, error };
};

export default useSwrPost;
