import  './Fab.css'
import {useState} from "react";
import {Link} from "react-router-dom";

function FabAddMember({addr,initObj}){
    const [isActive, setActive] = useState(false);
    const handleToggle = () => {
        setActive(!isActive);
    };

    return(
        <>
            <div className={`btn-group-fab shadow-sm ${isActive ? 'active' : ''}`}  onClick={handleToggle} role="group" aria-label="FAB Menu">
                <div>
                    <Link to={addr}
                          state={{ initValue: initObj }}
                          type="button"
                          className="btn btn-main  shadow-sm  d-flex
                          align-items-center justify-content-center
                          btn-prime1 has-tooltip"
                          data-placement="left"
                          variant="outlined"
                          title="Menu">
                        <i className="text-dark fs-4   bi bi-plus-lg  "></i>
                    </Link>
                </div>
            </div>
        </>
    );
}
export default FabAddMember;