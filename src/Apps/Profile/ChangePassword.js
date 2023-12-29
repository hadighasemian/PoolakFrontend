import React, {useState} from "react";
import getConfiguredAxis from "../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../Resource/DB/Models/Auth/AuthModel";
import { useNavigate} from "react-router-dom";
import URLs from "../../Resource/Net/URLs";
import getAddress from "../../Resource/Routing/Addresses/getAddress";
import i18next from "i18next";
import {useFormik} from "formik";
import UnpackErrors from "../../Resource/Net/Error/UnpackErrors";
import StatusFrame from "../Other/StatusFrame";
import LoadingBtn from "../../Resource/Component/LoadingBtn";
import {useDispatch} from "react-redux";
import {setAuthUser} from "../../Resource/DB/Redux/authSlice";
function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const axiosInstance = getConfiguredAxis(AuthModel());
    const navigate = useNavigate();
    const {user} = AuthModel()
    const dispatch = useDispatch();


    const goGroupHome = ()=>{
        navigate(getAddress('Home'), { replace: true });
    }
    function changeFormikValue(name,value){
        formik.values[name]=value
        formik.setFieldValue(name, value);
    }
    function changeFormikField(e) {
        changeFormikValue(e.target.name,e.target.value)
    }
    const validate=values => {
        const errors = {};
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
    const formik = useFormik({
        initialValues: {
            password: "",
            password_confirmation: "",
            mobile: user.mobile,
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            axiosInstance.post(URLs['change_password'],values).then(function (response) {
                if (response?.data?.state?.success){
                    dispatch(setAuthUser(response?.data?.data?.user))
                    goGroupHome()
                    return
                }
            }).catch(function (error) {
                console.log(error)
                setErrors(UnpackErrors(error))
            }).finally(()=>{
                setLoading(false)
            });
        },
    });
    return(
        <StatusFrame loading={initialLoading} error={error}>
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
                                <LoadingBtn loading={loading}></LoadingBtn>
                                <button onClick={goGroupHome} type='button' className="btn  btn-outline-warning mx-3" >{i18next.t('cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StatusFrame>
    )
}
export default ChangePassword;