
function ToastValidatorError(enqueueSnackbar,errors) {
    for (let errorKey in errors) {
        enqueueSnackbar(errors[errorKey][0],
            {
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                },
                style: {
                    fontFamily: 'sansDn', // Set your custom font here
                    fontSize: '16px', // Set your custom font size here
                    // Add other custom styles as needed
                },
            }
        );
    }
}
export default ToastValidatorError;