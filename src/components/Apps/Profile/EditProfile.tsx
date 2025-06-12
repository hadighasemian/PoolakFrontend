'use client';
import React, {useEffect, useState} from "react";
import { useRouter } from 'next/navigation'; // Replaced react-router-dom
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration
import * as yup from "yup";
import i18next from "i18next";
import {useFormik} from "formik";
// import UnpackErrors from "@/Resource/Net/Error/UnpackErrors"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Path adjusted, needs migration
// import {DatePicker} from "@mui/x-date-pickers"; // Already installed
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import {setUser} from "@/Resource/DB/Redux/authSlice"; // Needs migration (Redux setup)
import {useDispatch} from "react-redux"; // Already installed
// import {setAuthUser} from "@/Resource/DB/Redux/authSlice"; // Needs migration (Redux setup)

function EditProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null); // Typed error state
    const [initialLoading, setInitialLoading] = useState(false);
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Logic commented out
    const router = useRouter();
    // const {user} = AuthModel() // Logic commented out
    const user = { name: 'Dummy User', mobile: '1234567890' }; // Placeholder
    const dispatch = useDispatch();


    const goGroupHome = ()=>{
        router.replace('/home'); // Placeholder for getAddress('Home')
    }
    // function changeFormikValue(name,value){ // Not directly used, formik.setFieldValue is used
    //     formik.values[name]=value
    //     formik.setFieldValue(name, value);
    // }
    // function changeFormikField(e) { // Not directly used, formik.handleChange is used
    //     changeFormikValue(e.target.name,e.target.value)
    // }
    const validate = (values: { name?: string }) => { // Typed values
        const errors: { name?: string } = {}; // Typed errors
        if (!values.name) {
            errors.name = 'اسمت!؟';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            name: user.name,
            mobile: user.mobile,
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            // Mock submission logic
            console.log("Form submitted", values);
            setTimeout(() => {
                setLoading(false);
                // dispatch(setAuthUser(response?.data?.data?.user)) // Needs redux migration
                goGroupHome();
            }, 1000);
            // axiosInstance.post(URLs.profile.editProfile,values).then(function (response) {
            //     if (response?.data?.state?.success){
            //         dispatch(setAuthUser(response?.data?.data?.user))
            //         goGroupHome()
            //         return
            //     }
            // }).catch(function (error) {
            //     console.log(error)
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
                                <label htmlFor="name" className="form-label">نام و نام خانوادگی:</label>
                                <input type="text"
                                       className="form-control"
                                       name='name'
                                       id='name'
                                       value={formik.values.name}
                                       onChange={formik.handleChange}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="text-danger">{formik.errors.name}</div>
                                )}
                            </div>
                            <div className="d-flex flex-row m-3">
                                {/* <LoadingBtn loading={loading}></LoadingBtn> */} {/* LoadingBtn commented out */}
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Saving...' : 'Save'}
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
export default EditProfile;
