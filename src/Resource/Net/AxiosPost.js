import {useEffect, useState} from 'react';
import getConfiguredAxis from "./CreateAxiosInstance";
import AuthModel from "../DB/Models/Auth/AuthModel";

const AxiosPost = (url, postedData) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const axiosInstance = getConfiguredAxis(AuthModel());
    useEffect(() => {
    (
        async function(){
            try{
                setLoading(true)
                const response = await axiosInstance.post(url,postedData)
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

export default AxiosPost;
