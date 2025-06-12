import React from 'react';
import './MainLayout.css'; // Will create this CSS file

interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
    return(
        <div className='container-fluid  back6  p-0 m-0'  dir="rtl">
            <div className='row p-0 m-0  ' >
                <div className='col-sm-10 col-md-8 col-lg-6 col-xl-4 p-0 my-0 mx-auto vh-100   ' >
                    {children}
                </div>
            </div>
        </div>
    )
}
export default MainLayout;
