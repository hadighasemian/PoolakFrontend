'use client';
import React from 'react';
import Loading from "./Loading"; // Import migrated Loading component
import ErrorComponent from "./Error";   // Import migrated Error component (renamed)

interface StatusFrameProps {
  children: React.ReactNode;
  loading?: boolean;
  error?: any;
  className?: string;
}

function StatusFrame({ children, loading = false, error = false, className }: StatusFrameProps) {
    if (loading) {
        return <Loading/>; // Use the migrated Loading component
    }
    if (error && error !== false) { // Ensure error has a value to display
        return <ErrorComponent error={error}/>; // Use the migrated Error component
    }

    if (className) {
        return <div className={className}>{children}</div>;
    }

    return <>{children}</>;
}
export default StatusFrame;
