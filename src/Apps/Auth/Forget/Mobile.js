import React, {useState} from "react";
import getConfiguredAxis from "../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../Resource/DB/Models/Auth/AuthModel";
import {useFormik} from "formik";
import URLs from "../../../Resource/Net/URLs";
import StatusFrame from "../../Other/StatusFrame";
import LoadingBtn from "../../../Resource/Component/LoadingBtn";
import UnpackErrors from "../../../Resource/Net/Error/UnpackErrors";
import {Link} from "react-router-dom";
import getAddress from "../../../Resource/Routing/Addresses/getAddress";

function Mobile({setAuthData,setPageState}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const axiosInstance = getConfiguredAxis(AuthModel());
    const goToCode = (data)=>{
        setPageState('code')
        setAuthData(data)
    }
    const validate=values => {
        const errors = {};
        if (!values.mobile) {
            errors.mobile = 'شماره همراه را وارد  کنید.';
        }
        if (!/^\d{11}$/.test(values.mobile)) {
            errors.mobile = 'شماره همراه 11 رقمه قربون شکلت برم من!';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {
            mobile:'',
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            const postData = {...values}
            // console.log(values)
            axiosInstance.post(URLs.auth.forget.mobile,postData).then(function (response) {
                console.log(response)
                if (response?.data?.state?.success){
                    goToCode(response?.data?.data)
                    return
                }
                setErrors(UnpackErrors(error))
            }).catch(function (error) {
                setErrors(UnpackErrors(error))
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
                            <div className="form-group mt-2">
                                <label htmlFor="mobile">شماره همراه:</label>
                                <input
                                    type="tel"
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

                            <div className="d-flex flex-row m-3">
                                <LoadingBtn loading={loading}></LoadingBtn>
                            </div>
                            <div className="row">
                                <Link className='text-decoration-none  m-2' to={getAddress('Login')}>
                                    <li>
                                        ورود.
                                    </li>
                                </Link>
                                <Link className='text-decoration-none  m-2' to={getAddress('Register')}>
                                    <li>
                                        ثبت نام.
                                    </li>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StatusFrame>
    );
}
export default Mobile
