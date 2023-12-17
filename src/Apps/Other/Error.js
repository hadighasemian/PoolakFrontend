function Error({error}) {
    return (
        <div className='d-flex  h-100 align-content-center justify-content-center'>
            <span className='m-auto' color="secondary" >
                {error.message}
            </span>
        </div>
    );
}
export default Error;