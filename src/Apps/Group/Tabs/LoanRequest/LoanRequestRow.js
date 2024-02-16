import {Link} from "react-router-dom";
import moment from "jalali-moment";
import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useState} from "react";
import haveAccess from "../../../../Resource/ACL/HaveAccess";
import DeleteLoanRequestDialog from "./DeleteLoanRequestDialog";
import MakeLoanRequest from "../../../../DataManagers/MakeLoanRequest";


function LoanRequestRow({lonRequest,user,loan_group_id}) {
    const [deleteDialogOpen,setDeleteDialogOpen] = useState(false)
    const loanRequest = MakeLoanRequest(lonRequest,user,loan_group_id)
    const toggleDeleteDialog=()=>{
        setDeleteDialogOpen(!deleteDialogOpen)
    }
    const loanRequestToLoan = {
        id:'-1',
        loan_request_id:lonRequest.id,
        amount:loanRequest.amount,
        length:loanRequest.length,
        date:loanRequest.date,
        user_id:user.id,
        loan_group_id:loan_group_id
    }
    return(
        <div  className='card shadow-sm my-2 border-0 mx-0 '>
            <DeleteLoanRequestDialog loanRequest={loanRequest} open={deleteDialogOpen} handleClose={toggleDeleteDialog}/>
            <div className="card-header">
                <div className="row p-2 text-dark position-relative">
                    <div className="col-8">
                        <span className='small badge bg-light text-dark'>
                            {loanRequest?.name}
                            <span className="badge bg-secondary-subtle text-dark p-1 mx-1">
                                {user.mobile}
                            </span>
                        </span>
                        <span className='d-block  text-start text-muted badge'>
                            {loanRequest.length}
                            &nbsp;
                            ماهه
                            &nbsp;
                             به مبلغ
                            &nbsp;
                            {loanRequest.amount}
                        </span>
                        <span className='d-block  text-end text-muted badge'>
                            {digitsEnToFa(moment(loanRequest.date).locale('fa').format('dddd, LL'))}
                        </span>

                    </div>
                    {haveAccess() ?
                        <div className="col-4">
                            {!loanRequest.terminate ?
                                <Link to={getAddress('AddLoanRequest', loan_group_id)} state={{initValue: loanRequest}}
                                      className='btn float-start btn-outline-dark m-1 p-0'>
                                    <EditIcon className='p-1'/>
                                </Link>
                                :""
                            }
                            <button onClick={toggleDeleteDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                                <DeleteIcon className='p-1'/>
                            </button>
                        </div>:""
                    }
                </div>
            </div>
            {haveAccess() ?
                <Link to={getAddress('AddLoan',loan_group_id??-1)}
                      state={{ initValue: loanRequestToLoan }}
                      className="card-footer text-decoration-none text-prime1  d-flex align-items-center text-dark justify-content-center">
                    پرداخت وام
                </Link>:""
            }
        </div>
    );
}
export default LoanRequestRow