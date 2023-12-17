import {Link} from "react-router-dom";
import { digitsEnToFa} from "@persian-tools/persian-tools";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import DeleteMemberDialog from "./DeleteMemberDialog";
import {useState} from "react";
import CheckoutMemberDialog from "./CheckoutMemberDialog";
import MemberSum from "../../../../DataManagers/MemberSum";
import KeyIcon from '@mui/icons-material/Key';
import haveAccess from "../../../../Resource/ACL/HaveAccess";
function MemberRow({member}) {
    const [openDelete,setOpenDelete] = useState(false)
    const [openCheckout,setOpenCheckout] = useState(false)
    let memberToEdit = {
        id: member.id,
        mobile: member.user.mobile,
        loan_group_id: member.loan_group_id,
        role_id: member.role_id,
    }
    const toggleDeleteDialog=()=>{
        setOpenDelete(!openDelete)
    }
    const toggleCheckoutDialog=()=>{
        setOpenCheckout(!openCheckout)
    }
    const {loansAmountSum,paysValueSum,transactionsValueSum,loanNumber} = MemberSum(member)
    // for (let i = 0; i < member.loans; i++) {
    //     member.loans[i].pays = member.loans.payments?.reduce((accumulator, currentValue) =>accumulator + currentValue.value , 0)
    // }
    return(
        <>
            <DeleteMemberDialog  member={member} open={openDelete} handleClose={toggleDeleteDialog}/>
            <CheckoutMemberDialog  member={member} open={openCheckout} handleClose={toggleCheckoutDialog}/>
            <div className='card my-1  '>
                <div className="card-header">
                    {member.role.title=='admin'?<KeyIcon className='text-prime1'></KeyIcon>:null}
                    <span className='small fw-bold text-dark'> {member.user.name}</span>
                </div>
                <div className="card-body d-flex   flex-row justify-content-around ">
                    <span className='badge  back-prime1   border-1'>
                        موجودی:
                        {digitsEnToFa(transactionsValueSum)}
                    </span>
                    <span className='badge bg-danger border-1'>
                        تعداد
                        &nbsp;
                        {digitsEnToFa(loanNumber)}
                        &nbsp;
                        وام به مجموع مبالغ:
                        &nbsp;
                        {digitsEnToFa(loansAmountSum)}
                    </span>
                    <span className='badge back-prime1 border-1'>
                        مبلغ پرداختی وام ها:
                        &nbsp;
                        {digitsEnToFa(paysValueSum)}
                    </span>
                </div>
                <div className="card-footer ">
                    {haveAccess()?
                        <>
                            <Link to={getAddress('AddMember')} state={{initValue: memberToEdit}}
                                  className='btn float-start btn-outline-dark m-1 p-0'>
                                <EditIcon className='p-1'/>
                            </Link>
                            <button onClick={toggleDeleteDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                            <DeleteIcon  className='p-1'/>
                            </button>
                            <button onClick={toggleCheckoutDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                            <DoDisturbOnIcon  className='p-1'/>
                            </button>
                        </>
                        :
                        ""
                    }
                </div>
            </div>
        </>
    );
}
export default MemberRow