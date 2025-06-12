import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {

    return(
        <div className='container-fluid p-0 back5 h-100'>
            {children}
         </div>
    )
}
export default AuthLayout;
