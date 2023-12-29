import {Outlet} from "react-router-dom";
import './HomeLayout.css'
import NavBar from "./NavBar";

function HomeLayout() {

    return(
        <div className=" position-relative  h-100  sansFont  p-0 m-0 ">
            <NavBar  className='NavBar'/>
            <div className=" p-0 m-0 home_frame    back3">
                <Outlet/>
            </div>
        </div>
    );
}
export default HomeLayout;
