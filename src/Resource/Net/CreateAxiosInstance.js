import axios from "axios";
import {useNavigate} from "react-router-dom";
import getAddress from "../Routing/Addresses/getAddress";
import URLs from "./URLs";
import ToastMessages from "../../Apps/Other/ToastMessages";
import {useSnackbar} from "notistack";

const CreateAxiosInstance = ({login,user}) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();

    const instance =  axios.create({
        baseURL: URLs['base'],
        timeout: 10000,
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + login?.token ?? '',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    });
    instance.interceptors.response.use(response =>{
        if(response?.data?.toastMessages?.length>0){
            ToastMessages(enqueueSnackbar,response?.data?.toastMessages)
        }
        return response
        }, error => {
            if (error.response.status === 401) {
                navigate(getAddress('login'),{replace:true})
            }
            return Promise.reject(error);
        }
    );
    return instance;
};

export default CreateAxiosInstance;