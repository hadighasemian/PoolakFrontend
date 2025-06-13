'use client';
import React, {useEffect, useState} from "react";
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
import {useFormik} from "formik";
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import {setAuthState} from "@/Resource/DB/Redux/authSlice"; // Needs Redux
// import {useDispatch} from "react-redux"; // Needs Redux
// import { useRouter } from 'next/navigation'; // Not used directly here, but parent might

interface CodeVerificationInputProps {
    authData: any; // Contains token, user.mobile, user.id, user.time
    setPageState: (state: string) => void;
    apiEndpoint: string; // e.g., URLs.auth.register.confirm_code
    successPageState: string; // e.g., 'name' or 'pass'
    // Pass axiosInstance if it's configured outside and depends on authData
}

function CodeVerificationInput({authData, setPageState, apiEndpoint, successPageState}: CodeVerificationInputProps) {
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(authData?.user?.time || 60); // Default to 60s if not provided
    const [error, setError] = useState<any>(null);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false); // Renamed 'login' state
    const [responseData, setResponseData] = useState<any>(null); // Renamed 'data' state

    // const axiosInstance = getConfiguredAxis(authData); // Needs migration & decision on how to pass/init
    // const dispatch = useDispatch(); // Redux
    // const router = useRouter(); // If needed for navigation from here

    function backToMobile() {
        setPageState('mobile');
    }
    function goToNextStepOnSuccess() {
        setPageState(successPageState);
    }

    useEffect(() => {
        if (time === 0) return;
        const timer = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
        return () => clearInterval(timer);
    }, [time]);

    const seconds = String(time % 60).padStart(2, '0');
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');

    // useEffect(()=>{ // Handle Redux state (commented out for now)
    //     if (responseData?.data?.data?.authState) {
    //         // dispatch(setAuthState(responseData?.data?.data?.authState));
    //         setIsLoginSuccessful(responseData?.data?.data?.authState?.login?.login);
    //     }
    // },[responseData, dispatch]);

    useEffect(()=>{
        if(isLoginSuccessful){ // If login is successful (e.g. token verified)
            goToNextStepOnSuccess();
        }
    },[isLoginSuccessful]);


    const validate = (values: {code?:string}) => {
        const errors: {code?:string} = {};
        if (!values.code) {
            errors.code = 'کد را وارد کنید.';
        } else if (!/^\d{4}$/.test(values.code)) {
            errors.code = 'کد باید 4 رقمی باشد.';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: { code: '' },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            const postData = {
                ...values,
                token: authData?.login?.token,
                mobile: authData?.user?.mobile,
                id: authData?.user?.id,
            };
            console.log("Submitting to:", apiEndpoint, "with data:", postData);
            // Mock API call
            setTimeout(() => {
                // Simulate success
                // setResponseData({ data: { data: { authState: { login: { login: true } } } } });
                // setIsLoginSuccessful(true); // This will trigger useEffect to change page state
                // OR, if no further login state check needed from response, directly go to next step:
                goToNextStepOnSuccess();


                // Simulate error:
                // setErrors({ code: "Invalid or expired code." });
                // setError("Invalid or expired code from server."); // For StatusFrame
                setLoading(false);
            }, 1000);
            // axiosInstance.post(apiEndpoint, postData).then(function (response) {
            //     if (response?.data?.state?.success){
            //         setResponseData(response); // Triggers useEffect for Redux and navigation
            //         return;
            //     }
            //     setErrors(response.data.errors);
            // }).catch(function (err) {
            //     setError(err); // For StatusFrame
            //     setErrors(err?.response?.data?.errors || {code: "An unexpected error occurred."});
            // }).finally(()=>{ setLoading(false); });
        },
    });

    return (
        // <StatusFrame loading={loading} error={error}> {/* Needs migration */}
        <div className="container-fluid border-2 rounded-2 px-md-5 px-2">
            <div className="row">
                <div className='col'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mt-2">
                            <label htmlFor="code">کد دریافتی:</label>
                            <input
                                type="text" id="code" name="code" maxLength={4}
                                className={`form-control ${formik.touched.code && formik.errors.code ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.code}
                            />
                            {formik.touched.code && formik.errors.code && (
                                <div className="invalid-feedback">{formik.errors.code}</div>
                            )}
                        </div>
                        <div className="d-flex flex-column justify-content-center my-3"> {/* Margin y */}
                            {/* <LoadingBtn loading={loading}></LoadingBtn> */}
                             <button type="submit" className="btn btn-primary mb-2" disabled={loading}>
                                {loading ? "درحال بررسی..." : "تایید کد"}
                            </button>
                            <button type="button" onClick={backToMobile} disabled={time>0} className='btn btn-outline-secondary border-0'>
                                {time > 0 ? `${minutes} : ${seconds}` : 'ارسال مجدد / تغییر شماره'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </StatusFrame>
    );
}
export default CodeVerificationInput;
