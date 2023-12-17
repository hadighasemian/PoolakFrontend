import {Link} from "react-router-dom";
import moment from "jalali-moment";
import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteLoanDialog from "./DeleteLoanDialog";
import {useState} from "react";
import LoanLinearProgress from "./LoanLinearProgress";
import PaymentsList from "./Payment/PaymentsList";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import LoanSummarise from "../../../../DataManagers/LoanSummarise";
import MakeLoan from "../../../../DataManagers/MakeLoan";


function LoanRow({lon,user,loan_group_id}) {
    const [deleteDialogOpen,setDeleteDialogOpen] = useState(false)
    const [expand,setExpand] = useState(false)
    const loan = MakeLoan(lon,user,loan_group_id)
    const toggleDialog=()=>{
        setDeleteDialogOpen(!deleteDialogOpen)
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
    return(
        <div onClick={showLoan} className='card shadow-sm my-2 border-0 mx-0 '>
            <DeleteLoanDialog loan={loan} open={deleteDialogOpen} handleClose={toggleDialog}/>
            <div className="card-header">
                <div className="row p-2 text-dark position-relative">
                    <div className="col-8">
                        <span className='small badge bg-light text-dark'>({loan?.name})</span>
                        {digitsEnToFa(addCommas(sum))}/{digitsEnToFa(addCommas(loan.amount))}
                        <span className='mx-1'>تومان</span>
                        <span className='d-block  text-end text-muted badge'>
                            {digitsEnToFa(moment(loan.date).locale('fa').format('dddd, LL'))}
                        </span>
                    </div>
                    {haveAccess() ?
                        <div className="col-4  ">
                            <Link to={getAddress('AddLoan', loan_group_id)} state={{initValue: loan}}
                                  className='btn float-start btn-outline-dark m-1 p-0'>
                                <EditIcon className='p-1'/>
                            </Link>
                            <button onClick={toggleDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                                <DeleteIcon className='p-1'/>
                            </button>
                        </div>:""
                    }
                    <div className='col-12'>
                        <LoanLinearProgress paid={paid} time={time}/>
                    </div>
                </div>
            </div>
            {expand?<div className="card-body p-0 "><PaymentsList loan={loan} loan_group_id={loan_group_id} /></div>:null}

            {haveAccess() ?
                <Link to={getAddress('AddPayment', loan_group_id)} state={{payment: payment}}
                      className="card-footer text-decoration-none text-prime1  d-flex align-items-center text-dark justify-content-center">
                    پرداخت قسط
                </Link>:""
            }
        </div>
    );
}
export default LoanRow