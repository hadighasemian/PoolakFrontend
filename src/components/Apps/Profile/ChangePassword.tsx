'use client';
import React, {useState} from "react";
import { useRouter } from 'next/navigation'; // Replaced react-router-dom
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration
import i18next from "i18next";
import {useFormik} from "formik";
// import UnpackErrors from "@/Resource/Net/Error/UnpackErrors"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Path adjusted, needs migration
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
import {useDispatch} from "react-redux"; // Already installed
// import {setAuthUser} from "@/Resource/DB/Redux/authSlice"; // Needs migration (Redux setup)

interface ChangePasswordFormValues {
    password?: string;
    password_confirmation?: string;
    mobile: string;
}

function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null); // Typed error state
    const [initialLoading, setInitialLoading] = useState(false);
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Logic commented out
    const router = useRouter();
    // const {user} = AuthModel() // Logic commented out
    const user = { mobile: '1234567890' }; // Placeholder
    const dispatch = useDispatch();


    const goGroupHome = ()=>{
        router.replace('/home'); // Placeholder for getAddress('Home')
    }

    const validate = (values: ChangePasswordFormValues) => { // Typed values
        const errors: { password?: string; password_confirmation?: string } = {}; // Typed errors
        const passwordRegex = /(?=.*[0-9])/;
        if (!values.password) {
            errors.password = "?";
        } else if (values.password.length < 8) {
            errors.password = "حداقل 8 حرف.";
        } else if (!passwordRegex.test(values.password)) {
            errors.password = "حداقل یک عدد باید داشته باشه.";
        }else if (values.password !== values.password_confirmation) {
            errors.password_confirmation = "تکرار رمز عبور باید برابر رمز عبور باشه.";
        }
        return errors;
    }
    const formik = useFormik<ChangePasswordFormValues>({ // Typed useFormik
        initialValues: {
            password: "",
            password_confirmation: "",
            mobile: user.mobile,
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            // Mock submission logic
            console.log("Form submitted", values);
            setTimeout(() => {
                setLoading(false);
                // dispatch(setAuthUser(response?.data?.data?.user)) // Needs Redux
                goGroupHome();
            }, 1000);
            // axiosInstance.post(URLs.profile.changePassword,values).then(function (response) {
            //     if (response?.data?.state?.success){
            //         dispatch(setAuthUser(response?.data?.data?.user))
            //         goGroupHome()
            //         return
            //     }
            // }).catch(function (error) {
            //     setErrors(UnpackErrors(error))
            // }).finally(()=>{
            //     setLoading(false)
            // });
        },
    });
    return(
        // <StatusFrame loading={initialLoading} error={error}> {/* StatusFrame commented out */}
            <div className="container-fluid">
                <div className="row">
                    <div className='col pt-4'>
                        <form className='m-2' onSubmit={formik.handleSubmit}>
                            <div className="">
                                <label htmlFor="password" className="form-label">رمز عبور:</label>
                                <input type="password"
                                       className="form-control"
                                       name='password'
                                       id='password'
                                       value={formik.values.password}
                                       onChange={formik.handleChange}
                                       aria-labelledby="passwordHelpInline"
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="text-danger">{formik.errors.password}</div>
                                )}
                            </div>
                            <div className="mt-3">
                                <label htmlFor="password_confirmation" className="form-label">تکرار رمز عبور:</label>
                                <input type="password"
                                       className="form-control"
                                       name='password_confirmation'
                                       id='password_confirmation'
                                       value={formik.values.password_confirmation}
                                       onChange={formik.handleChange}
                                       aria-labelledby="passwordHelpInline"
                                />
                                {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                    <div className="text-danger">{formik.errors.password_confirmation}</div>
                                )}
                            </div>

                            <div className="d-flex flex-row m-3">
                                {/* <LoadingBtn loading={loading}></LoadingBtn> */} {/* LoadingBtn commented out */}
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>
                                <button onClick={goGroupHome} type='button' className="btn  btn-outline-warning mx-3" >{i18next.t('cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        // </StatusFrame>
    )
}
export default ChangePassword;
