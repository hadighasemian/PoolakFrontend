import React from 'react';
import Loading from "./Loading";
import Error from "./Error";

function StatusFrame({ children,loading=false,error=false }) {
    const child = React.Children.only(children);
    if (loading) return (<Loading/>)
    if (error) return (<Error error={error}/>)

    return (
        <>
            {child}
        </>
    );
}
export default StatusFrame;