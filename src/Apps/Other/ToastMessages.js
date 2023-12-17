
function ToastMessages(enqueueSnackbar,messages) {
    for (let msgKey in messages) {
        enqueueSnackbar(messages[msgKey]['msg'],
            {
                variant:messages[msgKey].config.variant,
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
function messageToToast(message){
    return {

        variant: message['config']['variant'],
            anchorOrigin: {
        vertical: message['config']['bottom'],
            horizontal: message['config']['left'],
    },
        style: {
            fontFamily: 'sansDn', // Set your custom font here
                fontSize: '16px', // Set your custom font size here
            // Add other custom styles as needed
        },

    }
}
export default ToastMessages;