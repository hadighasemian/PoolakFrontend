import {Outlet} from "react-router-dom";
import './Layout.css';

function Layout() {
    return(
        <div className='container-fluid  back6  p-0 m-0'  dir="rtl">
            <div className='row p-0 m-0  ' >
                <div className='col-sm-10 col-md-8 col-lg-6 col-xl-4 p-0 my-0 mx-auto vh-100   ' >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Layout;