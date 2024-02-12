import {Link} from "react-router-dom";
import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
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
import moment from "jalali-moment";
import {Tooltip} from "@mui/material";
function MemberRow({member}) {
    const [openDelete,setOpenDelete] = useState(false)
    const [openCheckout,setOpenCheckout] = useState(false)
    // console.log(member)
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
    const {terminatedLoan,terminatedLoanNo,activeLoan,activeLoanNo,paidActiveLoan,transactionsValueSum} = MemberSum(member)
    // console.log(member?.role?.title==='admin')
    return(
        <>
            <DeleteMemberDialog  member={member} open={openDelete} handleClose={toggleDeleteDialog}/>
            <CheckoutMemberDialog  member={member} open={openCheckout} handleClose={toggleCheckoutDialog}/>
            <div className="card my-1" >
                <div className="card-header">
                    {(member?.role?.title==='admin')?<KeyIcon className='text-prime1'></KeyIcon>:null}
                    <span className='small fw-bold text-dark'> {member.user.name}</span>
                    <span className=' float-start badge bg-secondary  '><small>{digitsEnToFa(member.user.mobile)}</small> </span>

                </div>

                <ul className="list-group list-group-flush px-1">
                    <li className="list-group-item d-flex flex-row ">
                        <small>
                            موجودی:
                            {digitsEnToFa(addCommas(transactionsValueSum))}
                        </small>

                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <small className='w-100'>
                            وام های فعال:
                            &nbsp;
                            {digitsEnToFa(addCommas(paidActiveLoan))}

                            &nbsp;
                            -
                            &nbsp;
                            {digitsEnToFa(addCommas(activeLoan))}

                            <small className='badge p-2 back-prime1 float-start'>
                                {digitsEnToFa(activeLoanNo)}
                            </small>


                        </small>
                    </li>
                    <li className="list-group-item d-flex flex-row">
                        <small className='w-100'>
                            وام های مختومه:
                            {digitsEnToFa(addCommas(terminatedLoan))}

                            <small className='badge  p-2 back-prime1 float-start'>
                                {digitsEnToFa(terminatedLoanNo)}
                            </small>


                        </small>
                    </li>
                    <li className="list-group-item d-flex flex-row ">
                        <small>
                            امتیاز وام:
                            <span className="badge bg-secondary-subtle text-dark">
                                به زودی...
                            </span>

                        </small>
                    </li>

                </ul>
                <div className="card-footer">
                    <span className=' text-muted badge ms-auto'>
                        {digitsEnToFa(moment(member.created_at).locale('fa').format('dddd, LL'))}
                    </span>
                    {haveAccess()?
                        <div className="float-start">
                            <Tooltip  title="ویرایش " placement="top">
                                <Link to={getAddress('AddMember')} state={{initValue: memberToEdit}}
                                      className='btn btn-outline-dark m-1 p-0'>
                                    <EditIcon className='p-1'/>
                                </Link>
                            </Tooltip>
                            <Tooltip  title="حذف " placement="top">
                                <button type={"button"}  onClick={toggleDeleteDialog} className='btn  btn-outline-dark m-1 p-0'>
                                    <DeleteIcon  className='p-1'/>
                                </button>
                            </Tooltip>
                            <Tooltip  title="تصفیه حساب " placement="top">
                                <button onClick={toggleCheckoutDialog} className='btn  btn-outline-dark m-1 p-0'>
                                    <DoDisturbOnIcon  className='p-1'/>
                                </button>
                            </Tooltip>
                        </div>
                        :
                        ""
                    }
                </div>
            </div>
        </>
    );
}
export default MemberRow