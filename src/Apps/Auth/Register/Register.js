import i18next from "i18next";
import {useFormik} from "formik";
import URLs from "../../../Resource/Net/URLs";
import StatusFrame from "../../Other/StatusFrame";
import LoadingBtn from "../../../Resource/Component/LoadingBtn";
import React, {useState} from "react";
import getConfiguredAxis from "../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../Resource/DB/Models/Auth/AuthModel";

function Register({setAuthData,setPageState}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const axiosInstance = getConfiguredAxis(AuthModel());
    const goToCode = (data)=>{
        setPageState('code')
        setAuthData(data)
    }
    const validate=values => {
        const errors = {};

        if (!values.name) {
            errors.name = 'نام ضروری است.';
        }

        if (!values.password) {
            errors.password = 'کلمه عبور ضروری است.';
        } else if (values.password.length < 8) {
            errors.password = 'حداقل طول کلمه عبور 8 کاراکتر است.';
        }

        if (!values.password_confirmation) {
            errors.password_confirmation = 'تکرار کلمه عبور را وارد کنید.';
        } else if (values.password_confirmation !== values.password) {
            errors.password_confirmation = 'تکرار با کلمه عبور برابر نیست.';
        }

        return errors;
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile:'',
            password: '',
            password_confirmation: '',
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            const postData = {...values}
            // console.log(values)
            axiosInstance.post(URLs['register'],postData).then(function (response) {
                // console.log(response)
                if (response?.data?.state?.success){
                    goToCode(response?.data?.data)
                    // console.log(response)
                    // next()
                    return
                }
                setErrors(response.data.errors);
            }).catch(function (error) {
                setError(error)
            }).finally(()=>{
                setLoading(false)
            });
        },
    });

    function changeFormikValue(name,value){
        formik.values[name]=value
        formik.setFieldValue(name, value);
    }
    function next() {

    }

    return (
        <StatusFrame loading={loading} error={error}>
            <div className="container-fluid border-2 rounded-2 px-5 ">
                <div className="row">
                    <div className='col'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">نام:</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`form-control ${
                                        formik.touched.name && formik.errors.name ? 'is-invalid' : ''
                                    }`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <div className="invalid-feedback">{formik.errors.name}</div>
                                )}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="mobile">شماره همراه:</label>
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    className={`form-control ${
                                        formik.touched.mobile && formik.errors.mobile
                                            ? 'is-invalid'
                                            : ''
                                    }`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.mobile}
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <div className="invalid-feedback">{formik.errors.mobile}</div>
                                )}
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">کلمه عبور:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className={`form-control ${
                                        formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                                    }`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="password_confirmation">تکرار کلمه عبور:</label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    className={
                                        `form-control 
                                        ${formik.touched.password_confirmation && formik.errors.password_confirmation ? 
                                        'is-invalid' : ''
                                        }`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password_confirmation}
                                />
                                {formik.touched.password_confirmation && formik.errors.password_confirmation && (
                                    <div className="invalid-feedback">
                                        {formik.errors.password_confirmation}
                                    </div>
                                )}
                            </div>
                            <div className="d-flex flex-row m-3">
                                <LoadingBtn loading={loading}></LoadingBtn>
                                <button onClick={next} type='button' className="btn  btn-outline-warning mx-3" >{i18next.t('cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StatusFrame>
    );
}

export default Register;
