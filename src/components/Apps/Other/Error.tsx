'use client'; // If it might have client-side interactions or hooks in future
import React from 'react'; // React import

interface ErrorProps {
  error?: any; // Can be Error object, string, or other types
}

function ErrorComponent({error}: ErrorProps) { // Renamed to ErrorComponent to avoid conflict with built-in Error
    let errorMessage = "An unexpected error occurred.";
    if (error) {
        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error.message && typeof error.message === 'string') {
            errorMessage = error.message;
        } else if (typeof error.toString === 'function') {
            errorMessage = error.toString();
        }
    }

    return (
        <div className='d-flex h-100 align-content-center justify-content-center'>
            <span className='m-auto text-danger'> {/* Added text-danger for styling */}
                {errorMessage}
            </span>
        </div>
    );
}
export default ErrorComponent;
