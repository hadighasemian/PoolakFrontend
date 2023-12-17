function UnpackErrors(error) {
    return error?.response?.data?.errors;
}
export default UnpackErrors;