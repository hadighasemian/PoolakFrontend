import React, {useEffect, useState} from "react";
import getConfiguredAxis from "../../../Resource/Net/CreateAxiosInstance";
import {useFormik} from "formik";
import URLs from "../../../Resource/Net/URLs";
import StatusFrame from "../../Other/StatusFrame";
import LoadingBtn from "../../../Resource/Component/LoadingBtn";
import {useNavigate} from "react-router-dom";
import getAddress from "../../../Resource/Routing/Addresses/getAddress";
import {setAuthState} from "../../../Resource/DB/Redux/authSlice";
import {useDispatch} from "react-redux";
import logout from "../Logout";

function Name({authData,setPageState}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch()


    const axiosInstance = getConfiguredAxis(authData);
    const navigate = useNavigate();

    function goToLogin() {

        navigate(getAddress('Login'), { replace: true });
    }
    useEffect(()=>{
        if (data?.data?.data?.authState) {
            logout()
            dispatch(setAuthState(data?.data?.data?.authState))
        }
    },[data])


    const validate=values => {
        const errors = {};
        const passwordRegex = /(?=.*[0-9])/;

        if (!values.name) {
            errors.name = 'نام ضروری است.';
        }
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

    const formik = useFormik({
        initialValues: {
            name: '',
            password: '',
            password_confirmation: '',
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            const postData = {...values}
            console.log(postData)
            axiosInstance.post(URLs.auth.register.register,postData).then(function (response) {

                if (response?.data?.state?.success){
                    setData(response)
                    goToLogin()
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

    return (
        <StatusFrame loading={loading} error={error}>
            <div className="container-fluid border-2 rounded-2 px-5 ">
                <div className="row">
                    <div className='col'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">اسمت؟</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    autoComplete={false}
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
                                {/*<button onClick={goToMobile} type='button' className="btn  btn-outline-warning mx-3" >{i18next.t('cancel')}</button>*/}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StatusFrame>
    );
}
export default Name
