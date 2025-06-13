'use client';
import React, {useState} from "react";
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
import {useFormik} from "formik";
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import UnpackErrors from "@/Resource/Net/Error/UnpackErrors"; // Needs migration
import Link from "next/link"; // Next.js Link
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration

interface MobileInputProps {
    setAuthData: (data: any) => void;
    setPageState: (state: string) => void;
    apiEndpoint: string; // To make API URL configurable e.g. URLs.auth.register.mobile
    successState: string; // e.g. 'code'
    links: Array<{ href: string; text: string; isListItem?: boolean }>;
}

function MobileInput({setAuthData, setPageState, apiEndpoint, successState, links}: MobileInputProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null); // For StatusFrame if used
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Needs migration

    const goToNextStep = (data: any)=>{
        setPageState(successState);
        setAuthData(data);
    }

    const validate = (values: {mobile?: string}) => {
        const errors: {mobile?: string} = {};
        if (!values.mobile) {
            errors.mobile = 'شماره همراه را وارد کنید.';
        } else if (!/^\d{11}$/.test(values.mobile)) {
            errors.mobile = 'شماره همراه 11 رقمی معتبر وارد کنید.';
        }
        return errors;
    }

    const formik = useFormik({
        initialValues: { mobile: '' },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            console.log("Submitting to:", apiEndpoint, "with data:", values);
            // Mock API Call
            setTimeout(() => {
                // Simulate success
                goToNextStep({ message: "OTP sent to " + values.mobile });
                // Or simulate error:
                // setErrors({ mobile: "This mobile number is blocked." });
                setLoading(false);
            }, 1000);
            // axiosInstance.post(apiEndpoint, values).then(function (response) {
            //     if (response?.data?.state?.success){
            //         goToNextStep(response?.data?.data);
            //         return;
            //     }
            //     setErrors(UnpackErrors(response?.data?.errors || {})); // Use UnpackErrors if available
            // }).catch(function (err) {
            //     setErrors(UnpackErrors(err?.response?.data?.errors || {})); // Use UnpackErrors
            // }).finally(()=>{ setLoading(false) });
        },
    });

    return (
        // <StatusFrame loading={loading} error={error}> {/* Needs migration */}
        <div className="container-fluid border-2 rounded-2 px-md-5 px-2"> {/* Responsive padding */}
            <div className="row">
                <div className='col'>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group mt-2">
                            <label htmlFor="mobile">شماره همراه:</label>
                            <input
                                type="tel" id="mobile" name="mobile"
                                className={`form-control ${formik.touched.mobile && formik.errors.mobile ? 'is-invalid' : ''}`}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile}
                            />
                            {formik.touched.mobile && formik.errors.mobile && (
                                <div className="invalid-feedback">{formik.errors.mobile}</div>
                            )}
                        </div>
                        <div className="d-flex flex-row my-3"> {/* Margin y */}
                            {/* <LoadingBtn loading={loading}></LoadingBtn> */}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "درحال ارسال..." : "ادامه"}
                            </button>
                        </div>
                        <div className="row">
                            {links.map(link => (
                                <Link key={link.href} className='text-decoration-none m-2' href={link.href}>
                                    {link.isListItem ? <li>{link.text}</li> : link.text}
                                </Link>
                            ))}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </StatusFrame>
    );
}
export default MobileInput;
