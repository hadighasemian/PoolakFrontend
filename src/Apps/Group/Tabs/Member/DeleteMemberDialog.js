import { Dialog} from "@mui/material";
import getConfiguredAxis from "../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import ToastValidatorError from "../../../Other/ToastValidatorError";
import UnpackErrors from "../../../../Resource/Net/Error/UnpackErrors";
import URLs from "../../../../Resource/Net/URLs";

function DeleteMemberDialog({open,handleClose,member}) {
    const axiosInstance = getConfiguredAxis(AuthModel());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const { enqueueSnackbar } = useSnackbar();
    let url= URLs['delete_member_group']

    const deleteLoan = () => {
        setLoading(true)
        axiosInstance.post(url, {membership_id:member.id}).then(function (response) {

            if (response?.data?.state?.success){
                handleClose()
                return
            }

        }).catch(function (error) {
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
                    حذف تراکنش
                </div>
                <div className="card-body">
                    <div className='col'>
                        آیا مایل به حذف&nbsp;{member.user.name}&nbsp;هستید؟
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
export default DeleteMemberDialog;