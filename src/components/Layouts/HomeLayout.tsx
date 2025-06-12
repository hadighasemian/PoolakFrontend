import React from 'react';
import './HomeLayout.css'; // Will create this
// import NavBar from "./NavBar"; // NavBar needs to be migrated and path updated

interface HomeLayoutProps {
  children: React.ReactNode;
}

function HomeLayout({ children }: HomeLayoutProps) {

    return(
        <div className=" position-relative  h-100  sansFont  p-0 m-0 ">
            {/* <NavBar  className='NavBar'/> */} {/* NavBar commented out for now */}
            <div className=" p-0 m-0 home_frame    back3">
                {children}
            </div>
        </div>
    );
}
export default HomeLayout;
