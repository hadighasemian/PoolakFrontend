import  './FabHome.css'
import {useState} from "react";
import AddLoanGroupDialog from "./AddLoanGroup";

function FabHome(){
    const [isActive, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    };
    const toggleAddGroupDialog = () => {
        setOpen(!open);
    };
    const group={
        id:-1,
        name:''
    }
    return(
        <>
            <AddLoanGroupDialog open={open} group={group} toggleAddGroupDialog={toggleAddGroupDialog} />
            <div className={isActive ? "btn-group-fab active" : 'btn-group-fab'} onClick={handleToggle} role="group" aria-label="FAB Menu">
                <div>
                    <button type="button" className="btn btn-main p-0  btn-primary has-tooltip  " data-placement="left"
                            variant="outlined" onClick={toggleAddGroupDialog}
                            title="Menu">
                        <i className="text-dark  bi bi-plus-lg m-0 p-0"></i>
                    </button>
                    {/*<button type="button" className="btn btn-sub btn-info has-tooltip" data-placement="left"*/}
                    {/*        title="Fullscreen">*/}
                    {/*    <i className="fa fa-arrows-alt"></i></button>*/}
                    {/*<button type="button" className="btn btn-sub btn-danger has-tooltip" data-placement="left" title="Save">*/}
                    {/*    <i className="fa fa-floppy-o"></i></button>*/}
                    {/*<button type="button" className="btn btn-sub btn-warning has-tooltip" data-placement="left"*/}
                    {/*        title="Download">*/}
                    {/*    <i className="fa fa-download"></i>*/}
                    {/*</button>*/}
                </div>
            </div>
        </>
    );
}
export default FabHome;