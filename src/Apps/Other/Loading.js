import {CircularProgress} from "@mui/material";

function Loading() {
    return (
        <div className='d-flex  h-100 align-content-center justify-content-center'>
            <CircularProgress className='m-auto' color="secondary" />
        </div>
    );
}
export default Loading;