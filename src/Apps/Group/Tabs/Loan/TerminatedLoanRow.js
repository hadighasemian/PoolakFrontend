import {Link} from "react-router-dom";
import moment from "jalali-moment";
import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from '@mui/icons-material/Check';
import DeleteLoanDialog from "./DeleteLoanDialog";
import {useState} from "react";
import LoanLinearProgress from "./LoanLinearProgress";
import PaymentsList from "./Payment/PaymentsList";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import LoanSummarise from "../../../../DataManagers/LoanSummarise";
import MakeLoan from "../../../../DataManagers/MakeLoan";
import TerminatingLoanDialog from "./TerminatingLoanDialog";


function TerminatedLoanRow({lon,user,loan_group_id}) {
    const [deleteDialogOpen,setDeleteDialogOpen] = useState(false)
    const [terminateDialogOpen,setTerminateDialogOpen] = useState(false)
    const [expand,setExpand] = useState(false)
    const loan = MakeLoan(lon,user,loan_group_id)
    const toggleDeleteDialog=()=>{
        setDeleteDialogOpen(!deleteDialogOpen)
    }
    const toggleTerminateDialog=()=>{
        setTerminateDialogOpen(!terminateDialogOpen)
    }

    const showLoan=(event)=>{
        setExpand(!expand)
    }
    const {sum,paid,time} = LoanSummarise(loan);
    const payment =  {
        id: -1,
        loan_id: loan.id,
        value: 0,
        date: new Date(),
    }
    // console.log(user.mobile)
    return(
        <div onClick={showLoan} className='card shadow-sm my-2 border-0 mx-0 '>
            <DeleteLoanDialog loan={loan} open={deleteDialogOpen} handleClose={toggleDeleteDialog}/>
            <TerminatingLoanDialog loan={loan} open={terminateDialogOpen} handleClose={toggleTerminateDialog}/>
            <div className="card-header">
                <div className="row p-2 text-dark position-relative">
                    <div className="col-8">
                        <span className='small badge bg-light text-dark'>
                            {loan?.name}
                            <span className="badge bg-secondary-subtle text-dark p-1 mx-1">
                                {user.mobile}
                            </span>
                        </span>
                        <span className='d-block  text-end text-muted badge'>
                            {digitsEnToFa(moment(loan.date).locale('fa').format('dddd, LL'))}
                        </span>
                    </div>
                    {haveAccess() ?
                        <div className="col-4">
                            <button onClick={toggleDeleteDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                                <DeleteIcon className='p-1'/>
                            </button>
                        </div>:""
                    }
                    <div className='col-12 text-center'>
                        {digitsEnToFa(addCommas(sum))} - {digitsEnToFa(addCommas(loan.amount))}

                    </div>
                    <div className='col-12'>
                        <LoanLinearProgress paid={paid} time={time}/>
                    </div>
                </div>
            </div>
            {expand?<div className="card-body p-0 "><PaymentsList loan={loan} loan_group_id={loan_group_id} /></div>:null}
        </div>
    );
}
export default TerminatedLoanRow