import {useEffect, useState} from 'react';
import getConfiguredAxis from "./CreateAxiosInstance";
import AuthModel from "../DB/Models/Auth/AuthModel";

const useAxiosGet = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const axiosInstance = getConfiguredAxis(AuthModel());
    useEffect(() => {
    (
        async function(){
            try{
                setLoading(true)
                const response = await axiosInstance.get(url)
                setData(response.data)
            }catch(err){
                setError(err)
            }finally{
                setLoading(false)
            }
        }
    )()
    }, [url])
    return { data, loading, error};
};

export default useAxiosGet;
