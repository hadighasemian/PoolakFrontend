import { Dialog} from "@mui/material";
import getConfiguredAxis from "../../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../../Resource/DB/Models/Auth/AuthModel";
import {useState} from "react";
import StatusFrame from "../../../../Other/StatusFrame";
import URLs from "../../../../../Resource/Net/URLs";
import {setUpdateFlag} from "../../../../../Resource/DB/Redux/loanGroupSlice";
import {useDispatch} from "react-redux";

function DeletePaymentDialog({open,handleClose,pay}) {
    const axiosInstance = getConfiguredAxis(AuthModel());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch()

    const deleteLoan = () => {
        setLoading(true)
        axiosInstance.post(URLs.loan_groups.payments.delete,pay).then(function (response) {
            if (response?.data?.state?.success){
                dispatch(setUpdateFlag());
                handleClose()
            }
            setError(response.data.errors);
        }).catch(function (error) {
            setError(true)
        }).finally(()=>{
            setLoading(false)
        });
    }
    return (
        <Dialog className='rtl-direction sansFont' maxWidth='xs' open={open} onClose={handleClose}>
            <div className="card">
                <div className="card-header back-prime1">
                    حذف تراکنش
                </div>
                <div className="card-body">
                    <StatusFrame error={error} loading={loading}>
                        <div className='col'>
                            آیا مایل به حذف قسط
                            &nbsp;{pay.name}&nbsp;
                            به مبلغ
                            &nbsp;{pay.value}&nbsp;
                            تومان هستید؟
                        </div>
                    </StatusFrame>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <button onClick={deleteLoan} className='btn btn-prime1 mx-2'>بله</button>
                    <button onClick={handleClose} className='btn btn-danger mx-1'>خیر</button>
                </div>

            </div>
        </Dialog>
    );
}
export default DeletePaymentDialog;