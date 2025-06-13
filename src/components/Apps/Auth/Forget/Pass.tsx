'use client';
import React, {useEffect, useState} from "react";
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
import {useFormik} from "formik";
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import {setAuthState} from "@/Resource/DB/Redux/authSlice"; // Needs Redux
// import {useDispatch} from "react-redux"; // Needs Redux
import { useRouter } from "next/navigation"; // Next.js router
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration

interface PassProps {
    authData: any; // Contains token from previous step
    setPageState: (state: string) => void; // Though not used in original
}

function Pass({authData, setPageState}: PassProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    // const axiosInstance = getConfiguredAxis(authData); // Needs migration
    const router = useRouter();

    function goToHome() {
        // router.replace(getAddress('Home')); // Needs getAddress
        router.replace('/home');
    }

    const validate = (values: any) => {
        const errors: any = {};
        const passwordRegex = /(?=.*[0-9])/;
        if (!values.password) { errors.password = "رمز عبور ضروری است."; }
        else if (values.password.length < 8) { errors.password = "حداقل 8 حرف."; }
        else if (!passwordRegex.test(values.password)) { errors.password = "حداقل یک عدد باید داشته باشه."; }
        else if (values.password !== values.password_confirmation) { errors.password_confirmation = "تکرار رمز عبور باید برابر رمز عبور باشه.";}
        return errors;
    }

    const formik = useFormik({
        initialValues: { password: '', password_confirmation: '' },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            const postData = {...values, token: authData?.login?.token }; // Pass token
            console.log("Submitting new password data:", postData);
            // Mock API Call
            setTimeout(() => {
                // Simulate success
                goToHome();
                // Simulate error
                // setErrors({ password: "This password has been used recently." });
                // setError("Server error during password reset."); // For StatusFrame
                setLoading(false);
            }, 1000);
            // axiosInstance.post(URLs.auth.forget.pass, postData).then(function (response) {
            //     if (response?.data?.state?.success){
            //         goToHome();
            //         return;
            //     }
            //     setErrors(response.data.errors);
            // }).catch(function (err) {
            //     setError(err);
            //     setErrors(err?.response?.data?.errors || {password: "An unexpected error occurred."});
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
                            <label htmlFor="password">کلمه عبور جدید:</label>
                            <input type="password" id="password" name="password"
                                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (<div className="invalid-feedback">{formik.errors.password}</div>)}
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password_confirmation">تکرار کلمه عبور جدید:</label>
                            <input type="password" id="password_confirmation" name="password_confirmation"
                                className={`form-control ${formik.touched.password_confirmation && formik.errors.password_confirmation ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password_confirmation}
                            />
                            {formik.touched.password_confirmation && formik.errors.password_confirmation && (<div className="invalid-feedback">{formik.errors.password_confirmation}</div>)}
                        </div>
                        <div className="d-flex flex-row my-3">
                            {/* <LoadingBtn loading={loading}></LoadingBtn> */}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "درحال ذخیره..." : "ذخیره کلمه عبور"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </StatusFrame>
    );
}
export default Pass;
