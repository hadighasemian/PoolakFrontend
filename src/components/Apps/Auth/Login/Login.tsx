'use client';
import React, {useEffect, useState} from "react";
import './Login.css'; // Will create this file
import { useFormik} from 'formik';
import i18next from "i18next";
import * as yup from "yup";
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import {useDispatch} from "react-redux"; // Needs Redux setup
// import {setAuthState} from "@/Resource/DB/Redux/authSlice"; // Needs Redux setup
import Link from "next/link"; // Replaced react-router-dom Link
import { useRouter } from 'next/navigation'; // Replaced react-router-dom useNavigate
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration

function Login() {
    const [data, setData] = useState<any>(null);
    const [isLoginSuccessful, setIsLoginSuccessful] = useState(false); // Renamed 'login' state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    // const dispatch = useDispatch(); // Redux
    const router = useRouter();
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Needs migration

    useEffect(()=>{
        if(isLoginSuccessful){
            router.replace('/home'); // Directly use path
        }
    },[isLoginSuccessful, router]);

    useEffect(()=>{
        if (data?.data?.data?.authState) {
            // dispatch(setAuthState(data?.data?.data?.authState)); // Redux
            setIsLoginSuccessful(data?.data?.data?.authState?.login?.login);
        }
    },[data]);

    const validate = (values: any) => {
        const errors: any = {};
        const phoneRegExp = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
        if (!values.mobile) {
            errors.mobile = i18next.t('Required');
        } else if (!yup.string().matches(phoneRegExp).isValidSync(values.mobile)) {
            errors.mobile = 'Invalid phone number';
        }

        if (!values.password || values.password.length < 8) { // Simplified password check
            errors.password = i18next.t('Password must be at least 8 characters');
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {mobile: '', password: ''},
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            console.log("Login attempt with:", values);
            // Mock API call
            setTimeout(() => {
                // Simulate success/failure
                // setData({ data: { data: { authState: { login: { login: true } } } } }); // Simulate success
                setErrors({ mobile: "Mock error from server" }); // Simulate error
                setLoading(false);
            }, 1000);
            // axiosInstance.post(URLs.auth.login,values).then(function (response) {
            //     setData(response)
            // }).catch(function (error) {
            //     setErrors(error?.response?.data?.errors)
            // }).finally(()=>{ setLoading(false) });
        },
    });

    return (
        <form className='col mx-5' onSubmit={formik.handleSubmit}>
            <div className="my-4">
                <input
                    type="tel" className="form-control" name='mobile' id='mobile'
                    autoComplete='off' placeholder="شماره همراه"
                    value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile ? <div className="text-danger">{formik.errors.mobile}</div> : null}
            </div>
            <div className="my-4">
                <input
                    type="password" name='password' id="password" className="form-control"
                    placeholder="پسورد" onChange={formik.handleChange} onBlur={formik.handleBlur}
                    value={formik.values.password} // Added value binding
                    aria-labelledby="passwordHelpInline"/>
                {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
            </div>
            <div className="row">
                {/* <LoadingBtn loading={loading}></LoadingBtn> */}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
            <div className="row mt-3"> {/* Added margin top */}
                <Link className='text-decoration-none m-2' href="/auth/register">ثبت نام کنید.</Link> {/* Use href for Next Link */}
                <Link className='text-decoration-none m-2' href="/auth/forget">فراموشی رمز عبور.</Link> {/* Use href for Next Link */}
            </div>
        </form>
    );
}
export default Login;
