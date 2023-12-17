import {Outlet} from "react-router-dom";

function AuthLayout() {

    return(
        <div className='container-fluid p-0 back5 h-100'>
            <Outlet />
         </div>
    )
}
export default AuthLayout;