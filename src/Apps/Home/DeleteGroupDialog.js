import { Dialog} from "@mui/material";
import AuthModel from "../../Resource/DB/Models/Auth/AuthModel";
import {useEffect, useState} from "react";
import getConfiguredAxis from "../../Resource/Net/CreateAxiosInstance";
import {useSnackbar} from "notistack";
import UnpackErrors from "../../Resource/Net/Error/UnpackErrors";
import ToastValidatorError from "../Other/ToastValidatorError";


function DeleteGroupDialog({open,handleClose,url, group}) {
    const axiosInstance = getConfiguredAxis(AuthModel());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const deleteLoan = () => {
        setLoading(true)
        axiosInstance.post(url,group).then(function (response) {
            if (response?.data?.state?.success){
                handleClose()
            }
            setError(response.data.errors);
        }).catch(function (error) {
            setError(UnpackErrors(error))
        }).finally(()=>{
            setLoading(false)
        });
    }
    useEffect(()=>{
        ToastValidatorError(enqueueSnackbar,error)
        // handleClose()
    },[error])
    return (
        <Dialog className='rtl-direction sansFont' maxWidth='xs' open={open} onClose={handleClose}>
            <div className="card">
                <div className="card-header back-prime1">
                    حذف گروه
                </div>
                <div className="card-body">
                        <div className='col'>
                            آیا مایل به حذف گروه
                            &nbsp;{group.name}&nbsp;
                            هستید؟
                        </div>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <button onClick={deleteLoan} className='btn btn-prime1 mx-2'>بله</button>
                    <button onClick={handleClose} className='btn btn-danger mx-1'>خیر</button>
                </div>

            </div>
        </Dialog>
    );
}
export default DeleteGroupDialog;