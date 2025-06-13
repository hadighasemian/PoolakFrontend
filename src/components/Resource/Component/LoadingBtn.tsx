'use client'; // If i18next instance is client-side or if it becomes interactive
import React from 'react'; // React import
import i18next from "i18next"; // Assuming i18next is configured

interface LoadingBtnProps {
  loading: boolean;
  className?: string; // Optional className for the div wrapper
  buttonClassName?: string; // Optional className for the button itself
  type?: "button" | "submit" | "reset"; // Button type
  onClick?: () => void; // onClick handler for non-submit buttons
}

function LoadingBtn({ loading, className, buttonClassName, type = "submit", onClick }: LoadingBtnProps) {
    return(
        <div className={`justify-content-center d-flex ${className || ''}`}>
             {!loading ? (
                 <button type={type} className={`btn btn-primary ${buttonClassName || ''}`} onClick={onClick}>
                     {i18next.t('ok')}
                 </button>
             ) : (
                 <button type='button' className={`btn btn-outline-warning ${buttonClassName || ''}`} disabled> {/* Ensure it's disabled */}
                     <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                     {i18next.t('loading')}
                 </button>
             )}
        </div>
    );
}
export default LoadingBtn;
