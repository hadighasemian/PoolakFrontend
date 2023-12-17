import './Login.css';
import { useFormik} from 'formik';
import i18next from "i18next";
import * as yup from "yup";
import URLs from "../../../Resource/Net/URLs";
import React, {useEffect, useState} from "react";
import getConfiguredAxis from "../../../Resource/Net/CreateAxiosInstance";
import LoadingBtn from "../../../Resource/Component/LoadingBtn";
import {useDispatch} from "react-redux";
import {setAuthState} from "../../../Resource/DB/Redux/authSlice";
import {Link, useNavigate} from "react-router-dom";
import AuthModel from "../../../Resource/DB/Models/Auth/AuthModel";
import getAddress from "../../../Resource/Routing/Addresses/getAddress";

function Login() {
    const [data, setData] = useState(null);
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const axiosInstance = getConfiguredAxis(AuthModel());
    useEffect(()=>{
        if(login){
            navigate('/Home', { replace: true });
        }
    },[login])
    useEffect(()=>{
        if (data?.data?.data?.authState) {
            dispatch(setAuthState(data?.data?.data?.authState))
            setLogin(data?.data?.data?.authState?.login?.login)
        }
    },[data])

    const validate= values => {
        const errors = {};
        const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
        if (!values.mobile) {
            errors.mobile = i18next.t('Required');
        } else if (
            !yup.string().matches(phoneRegExp, 'Phone number is not valid').isValidSync(values.mobile)
        ) {
            errors.mobile = 'Invalid phone number';
        }

        // using yup single line
        if (yup.string().min(8).max(12).isValidSync(values.password)) {
            errors.password = i18next.t('Required');
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {mobile: '', password: ''},
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            // const { data, loading, error } = Login(values)
            axiosInstance.post(URLs['login'],values).then(function (response) {
                console.log(response)
                setData(response)
            }).catch(function (error) {
                setErrors(error?.response?.data?.errors)
            }).finally(()=>{
                setLoading(false)
            });
        },
    });

    return (
        <form className='col mx-5' onSubmit={formik.handleSubmit}>
            <div className="my-4">
                {/*<label htmlFor="mobile" className="form-label">نام کاربری (شماره همراه):</label>*/}
                <input
                    type="tel"
                    className="form-control"
                    name='mobile'
                    id='mobile'
                    placeholder="شماره همراه"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                />
                {formik.errors.mobile ? <div>{formik.errors.mobile}</div> : null}
            </div>
            <div className="my-4">
                {/*<label htmlFor="password" className="col-form-label">پسورد:</label>*/}
                <input
                    type="password"
                    name='password'
                    id="password"
                    className="form-control"
                    placeholder="پسورد"
                    // value={formik.values.mobile}
                    onChange={formik.handleChange}
                    aria-labelledby="passwordHelpInline"/>
                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
            </div>
            <div className="row">
                <LoadingBtn loading={loading}></LoadingBtn>
            </div>
            <div className="row">
                <Link className='text-decoration-none m-2' to={getAddress('MobileCode')}>ثبت نام کنید.</Link>
                <Link className='text-decoration-none m-2' to={getAddress('MobileCode')}>فراموشی رمز عبور.</Link>
            </div>
        </form>
    );
}

export default Login;
