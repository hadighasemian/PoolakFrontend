import {Link} from "react-router-dom";
import moment from "jalali-moment";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
import {useState} from "react";
import getAddress from "../../../../../Resource/Routing/Addresses/getAddress";
import DeletePaymentDialog from "./DeletePaymentDialog";
import haveAccess from "../../../../../Resource/ACL/HaveAccess";
import makePay from "../../../../../DataManagers/MakePay";

function PaymentRow({loan, payment}) {
    const [open,setOpen] = useState(false)
    const pay = makePay(payment,loan)
    const toggleDeleteDialog=(e)=>{
        e.stopPropagation()
        setOpen(!open)
    }
    return(
        <div className="row px-3 py-1 text-dark border-bottom position-relative">
            <DeletePaymentDialog  pay={pay} open={open} handleClose={toggleDeleteDialog}/>
            <div className="col-8   ">
                {digitsEnToFa(addCommas(pay.value))}
                <span className='mx-1'>تومان</span>
                <span className=' text-muted badge'>
                    {digitsEnToFa(moment(pay.date).locale('fa').format('dddd, LL'))}
                </span>
            </div>
            {haveAccess() ?
                <div className="col-4  ">
                    <Link to={getAddress('AddPayment', pay.loan_group_id)} state={{payment: pay}}
                          className='btn float-start btn-outline-dark border-0 m-1 p-0'>
                        <EditIcon className='p-1'/>
                    </Link>
                    <button onClick={toggleDeleteDialog} className='btn float-start btn-outline-dark border-0 m-1 p-0'>
                        <DeleteIcon className='p-1'/>
                    </button>
                </div>:""
            }
        </div>
    );
}
export default PaymentRow