import {Alert} from "react-bootstrap";

function Error({error}) {
    console.log(error)
    const keys = Object.keys(error);

    // for (let errorKey in error) {
    //    return(error[errorKey][0])
    // }
    return (
        keys.map(key=>{
            return(
                <Alert key={'danger'} variant={'danger'}>
                    {error[key]}
                </Alert>
            )
        })
    );
}
export default Error;