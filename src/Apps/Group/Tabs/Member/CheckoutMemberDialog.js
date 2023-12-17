import { Dialog} from "@mui/material";
import getConfiguredAxis from "../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";
import {useState} from "react";
import StatusFrame from "../../../Other/StatusFrame";
import URLs from "../../../../Resource/Net/URLs";

function CheckoutMemberDialog({open,handleClose,member}) {
    const axiosInstance = getConfiguredAxis(AuthModel());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const url=URLs['checkout_member']
    const checkoutMember = () => {
        setLoading(true)
        axiosInstance.post(url,member).then(function (response) {
            if (response?.data?.state?.success){
                handleClose()
                return
            }
            setError(response.data.errors);
        }).catch(function (error) {
            setError(error)
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
                            آیا مایل به تصویه حساب آقای
                            &nbsp;{member.user.name}&nbsp;
                            (حذف تمامی تراکنش ها و وام ها)
                             هستید؟
                        </div>
                    </StatusFrame>
                </div>
                <div className="card-footer d-flex justify-content-end">
                    <button onClick={checkoutMember} className='btn btn-prime1 mx-2'>بله</button>
                    <button onClick={handleClose} className='btn btn-danger mx-1'>خیر</button>
                </div>

            </div>
        </Dialog>
    );
}
export default CheckoutMemberDialog;