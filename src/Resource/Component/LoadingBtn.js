import i18next from "i18next";

function LoadingBtn({loading}) {
    return(
        <div className='justify-content-center d-flex  '>
             {!loading ? (
                 <button type="submit" className="btn  btn-primary">
                     {i18next.t('ok')}
                 </button>
             ) : (
                 <button type='button' className="btn btn-outline-warning  mx-auto">
                     <span className="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                     {i18next.t('loading')}
                 </button>
             )}
        </div>
    )
}
export default LoadingBtn;