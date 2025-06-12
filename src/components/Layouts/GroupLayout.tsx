import React from 'react';
import './GroupLayout.css'; // Will create this

interface GroupLayoutProps {
  children: React.ReactNode;
}

function GroupLayout({ children }: GroupLayoutProps) {
    return(
            <>{children}</> // Replaced Outlet with children, wrapped in fragment
    );
}
export default GroupLayout;
