import './HomeGroupsRow.css'
import {Link} from "react-router-dom";
import {addCommas, digitsEnToFa} from "@persian-tools/persian-tools";
import AddLoanGroupDialog from "./AddLoanGroup";
import {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import URLs from "../../Resource/Net/URLs";
import DeleteGroupDialog from "./DeleteGroupDialog";
import unpackGroupAuthRole from "../Group/UnpackGroupAuthRole";
import moment from "jalali-moment";
function HomeGroupsRow({ loanGroup}) {
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen,setDeleteDialogOpen] = useState(false)
    const role = unpackGroupAuthRole(loanGroup)
    const toggleDeleteDialog=()=>{
        setDeleteDialogOpen(!deleteDialogOpen)
    }
    const toggleAddGroupDialog = (e) => {
        setOpen(!open);
    };
    return (
        <>
            <AddLoanGroupDialog group={loanGroup} open={open} toggleAddGroupDialog={toggleAddGroupDialog}/>
            <DeleteGroupDialog url={URLs.loan_groups.delete} group={loanGroup} open={deleteDialogOpen} handleClose={toggleDeleteDialog}/>
            <div className="card my-1" >
                    <Link to={'LoanGroup/'+loanGroup.id} className="card-header  text-decoration-none ">
                        <span className="h6 fw-bold">
                            {loanGroup.name}
                        </span>
                        <span className="float-start ">
                            <i className="bi bi-people"></i>
                            &nbsp;
                            *
                            &nbsp;
                            {digitsEnToFa(loanGroup.countMember)}
                        </span>
                    </Link>

                <ul className="list-group list-group-flush px-1">
                    <li className="list-group-item">
                        موجودی:
                        &nbsp;
                        {digitsEnToFa(addCommas(loanGroup.cash))}
                    </li>
                    <li className="list-group-item">
                          مجموع وام ها:
                        &nbsp;
                        {digitsEnToFa(addCommas(loanGroup.totalLoans))}
                    </li>
                </ul>
                <div className="card-footer">
                    <span className=' text-muted badge ms-auto'>{digitsEnToFa(moment(loanGroup.created_at).locale('fa').format('dddd, LL'))}</span>
                    {role.role.title==='admin'?
                        <div className="float-start">
                            <button onClick={toggleAddGroupDialog} className='btn  btn-outline-dark m-1 p-0'>
                                <EditIcon className='p-1 m-0'/>
                            </button>
                            <button onClick={toggleDeleteDialog} className='btn  btn-outline-dark m-1 p-0'>
                                <DeleteIcon className='p-1 m-0'/>
                            </button>
                        </div>
                    :""}
                </div>
            </div>
        </>
    );
}
export default HomeGroupsRow