import { Dialog} from "@mui/material";
import getConfiguredAxis from "../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";
import {useEffect, useState} from "react";
import ToastValidatorError from "../../../Other/ToastValidatorError";
import {useSnackbar} from "notistack";
import UnpackErrors from "../../../../Resource/Net/Error/UnpackErrors";
import URLs from "../../../../Resource/Net/URLs";
import {setUpdateFlag} from "../../../../Resource/DB/Redux/loanGroupSlice";
import {useDispatch} from "react-redux";

function DeleteLoanDialog({open,handleClose,loan}) {
    const axiosInstance = getConfiguredAxis(AuthModel());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch()
    const deleteLoan = () => {
        setLoading(true)
        axiosInstance.post(URLs['delete_loan'],loan).then(function (response) {
            if (response?.data?.state?.success){
                dispatch(setUpdateFlag());
                handleClose()
            }
        }).catch(function (error) {
            handleClose()
            setError(UnpackErrors(error))
        }).finally(()=>{
            setLoading(false)
        });
    }
    useEffect(()=>{
        ToastValidatorError(enqueueSnackbar,error)
    },[error])
    return (
        <Dialog className='rtl-direction sansFont' maxWidth='xs' open={open} onClose={handleClose}>
            <div className="card">
                <div className="card-header back-prime1">
                    حذف وام
                </div>
                <div className="card-body">
                        <div className='col'>
                            آیا مایل به حذف وام
                            &nbsp;{loan.name}&nbsp;
                            به مبلغ
                            &nbsp;{loan.amount}&nbsp;
                            تومان هستید؟
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
export default DeleteLoanDialog;