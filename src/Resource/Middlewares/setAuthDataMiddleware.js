import {useDispatch} from "react-redux";
import {setAuthState} from "../DB/Redux/authSlice";


const setAuthDataMiddleware = (useSWRNext) => (key, fetcher, config) => {

    const dispatch = useDispatch()
    const swr = useSWRNext(key, fetcher, config)
    if (swr.data?.data?.data?.authState!== undefined){
        dispatch(setAuthState(swr.data?.data?.data?.authState))
    }
    return swr
}