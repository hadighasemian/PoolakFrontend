import {Link} from "react-router-dom";
import moment from "jalali-moment";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
import DeleteTransactionDialog from "./DeleteTransactionDialog";
import {useState} from "react";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import makeTransaction from "../../../../DataManagers/MakeTransaction";

function TransactionRow({transaction,user,loan_group_id}) {
    const [open,setOpen] = useState(false)
    const toggleDeleteDialog=()=>{
        setOpen(!open)
    }
    const trans = makeTransaction(transaction,user,loan_group_id)
    return(
        <div className="card my-1 ">
            <DeleteTransactionDialog  transaction={trans} open={open} handleClose={toggleDeleteDialog}/>
            <div className="card-header">
                <span className='small fw-bold text-dark'> {user.name}</span>
                <span className=' float-start badge bg-secondary'><small>{digitsEnToFa(user.mobile)}</small> </span>

            </div>
            <div className="card-body">
                <span className='mx-2'>
                    {trans.type=='1'? <ArrowCircleUpIcon className='text-prime1'/>:<ArrowCircleDownIcon className='text-danger'/>}
                </span>
                    {digitsEnToFa(addCommas(trans.value))}
                    <span className='mx-1'>تومان</span>
                    <span className=' text-muted badge ms-auto'>{digitsEnToFa(moment(trans.date).locale('fa').format('dddd, LL'))}</span>
            </div>
            {haveAccess() ?
                <div className="card-footer">
                    <Link to={getAddress('AddTransaction', loan_group_id)} state={{initValue: trans}}
                          className='btn float-start btn-outline-dark m-1 p-0'>
                        <EditIcon className='p-1'/>
                    </Link>
                    <button onClick={toggleDeleteDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                        <DeleteIcon className='p-1'/>
                    </button>
                </div>:""
            }
        </div>
    );
}
export default TransactionRow