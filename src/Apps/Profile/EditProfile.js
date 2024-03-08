import React, {useEffect, useState} from "react";
import getConfiguredAxis from "../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../Resource/DB/Models/Auth/AuthModel";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import URLs from "../../Resource/Net/URLs";
import getAddress from "../../Resource/Routing/Addresses/getAddress";
import * as yup from "yup";
import i18next from "i18next";
import {useFormik} from "formik";
import UnpackErrors from "../../Resource/Net/Error/UnpackErrors";
import StatusFrame from "../Other/StatusFrame";
import {DatePicker} from "@mui/x-date-pickers";
import LoadingBtn from "../../Resource/Component/LoadingBtn";
import {setUser} from "../../Resource/DB/Redux/authSlice";
import {useDispatch} from "react-redux";
import {setAuthUser} from "../../Resource/DB/Redux/authSlice";
function EditProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const axiosInstance = getConfiguredAxis(AuthModel());
    const navigate = useNavigate();
    const {user} = AuthModel()
    const dispatch = useDispatch();


    const goGroupHome = ()=>{
        navigate(getAddress('Home'), { replace: true });
        // toggleDialog()
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
            setLoading(true)
            axiosInstance.post(URLs.profile.editProfile,values).then(function (response) {
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
                                <label htmlFor="value" className="form-label">نام و نام خانوادگی:</label>
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
export default EditProfile;