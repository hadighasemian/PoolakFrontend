import './HomeGroupsRow.css'
import {Link} from "react-router-dom";
import {digitsEnToFa} from "@persian-tools/persian-tools";
import AddLoanGroupDialog from "./AddLoanGroup";
import {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import URLs from "../../Resource/Net/URLs";
import DeleteGroupDialog from "./DeleteGroupDialog";
import unpackGroupAuthRole from "../Group/UnpackGroupAuthRole";
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
            <DeleteGroupDialog url={URLs['delete_loan_group']} group={loanGroup} open={deleteDialogOpen} handleClose={toggleDeleteDialog}/>

            <div className="card my-1 text-dark ">
                <Link to={'LoanGroup/'+loanGroup.id} className="card-header text-decoration-none ">
                    {loanGroup.name}
                </Link>
                <div className="card-body  d-flex flex-row justify-content-around">
                  <span className=' small  border-1 rounded-4 border py-1 px-2'>
                      موجودی:
                      &nbsp;
                      {digitsEnToFa(loanGroup.cash)}
                  </span>
                <span className=' small  border-1 rounded-4 border p-1'>
                      مجموع وام ها:
                    &nbsp;
                    {digitsEnToFa(loanGroup.totalLoans)}
                  </span>
                <span className=' small  border-1 rounded-4 border p-1'>
                    <i className="bi bi-people"></i>
                    &nbsp;
                    *
                    &nbsp;
                    {digitsEnToFa(loanGroup.countMember)}
                </span>
            </div>
            {role.role.title==='admin'?
                <div className="card-footer">
                    <button onClick={toggleAddGroupDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                        <EditIcon className='p-1 m-0'/>
                    </button>
                    <button onClick={toggleDeleteDialog} className='btn float-start btn-outline-dark m-1 p-0'>
                        <DeleteIcon className='p-1 m-0'/>
                    </button>
                </div>
            :""}
            </div>
        </>
    );
}
export default HomeGroupsRow