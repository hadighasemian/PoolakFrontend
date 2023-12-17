import { Dialog} from "@mui/material";
import getConfiguredAxis from "../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";
import {useState} from "react";
import StatusFrame from "../../../Other/StatusFrame";
import URLs from "../../../../Resource/Net/URLs";

function DeleteTransactionDialog({open,handleClose, transaction}) {
    const axiosInstance = getConfiguredAxis(AuthModel());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const deleteTransactions = () => {
        setLoading(true)
        axiosInstance.post(URLs['delete_transaction'],transaction).then(function (response) {
            if (response?.data?.state?.success){
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
                            آیا مایل به حذف تراکنش
                            &nbsp;{transaction.name}&nbsp;
                            به مبلغ
                            &nbsp;{transaction.value}&nbsp;
                            تومان هستید؟
                        </div>
                    </StatusFrame>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <button onClick={deleteTransactions} className='btn btn-prime1 mx-2'>بله</button>
                    <button onClick={handleClose} className='btn btn-danger mx-1'>خیر</button>
                </div>

            </div>
        </Dialog>
    );
}
export default DeleteTransactionDialog;