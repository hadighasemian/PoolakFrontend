import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import getConfiguredAxis from "../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";
import URLs from "../../../../Resource/Net/URLs";
import {useFormik} from "formik";
import i18next from "i18next";
import LoadingBtn from "../../../../Resource/Component/LoadingBtn";
import StatusFrame from "../../../Other/StatusFrame";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import {ButtonGroup, ToggleButton} from "react-bootstrap";

function AddMember() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [roles,setRoles] =  useState([{id:'member', name:'عضو'}, {id:'admin', name:'ادمین'}])
    const axiosInstance = getConfiguredAxis(AuthModel());
    const location = useLocation();
    const member = location.state.initValue ;
    useEffect(()=>{
        axiosInstance.post(URLs.roles.index).then(function (response) {
            if (response?.data?.state?.success){
                setRoles(response?.data?.data?.roles)
                return
            }
        }).catch(function (error) {
            setError(error)
        }).finally(()=>{
            setInitialLoading(false)
        });
    },[])



    const goGroupHome = ()=>{
        navigate(getAddress('LoanGroup',member.loan_group_id), { replace: true });
    }
    const validate=values => {
        const errors = {};
        const isValidMobileNumber = /^\d{11}$/.test(values.mobile);
        if (!isValidMobileNumber) {
            errors.mobile = 'Register number must be a 10-digit number';
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {...member},
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            const postData = {...values}
            axiosInstance.post(URLs.loan_groups.member.add,postData).then(function (response) {
                if (response?.data?.state?.success){
                    goGroupHome()
                }
                // return '';
            }).catch(function (error) {
                setErrors(error?.response?.data?.errors)
            }).finally(()=>{
                setLoading(false)
            });
        },
    });

    function changeFormikValue(name,value){
        formik.values[name]=value
        formik.setFieldValue(name, value);
    }
    function changeFormikField(e) {
        const value = e.target.value
        const name = e.target.name
        changeFormikValue(name,value)
    }
    return (
        <StatusFrame loading={initialLoading} error={error}>
            <div className="container-fluid">
                <div className="row">
                    <div className='col pt-4'>
                        <form className='m-2' onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="mobile" className="form-label">موبایل:</label>
                                <input type="tel"
                                       className={`form-control ${
                                           formik.touched.mobile && formik.errors.mobile
                                               ? 'is-invalid'
                                               : ''
                                       }`}
                                       name='mobile'

                                       id='mobile'
                                       placeholder='0913'
                                       disabled={member.id !== -1}
                                       value={formik.values.mobile}
                                       onChange={formik.handleChange}
                                       onBlur={formik.handleBlur}
                                />
                                {formik.touched.mobile && formik.errors.mobile && (
                                    <div className="invalid-feedback">{formik.errors.mobile}</div>
                                )}
                            </div>
                            <div className="mt-3">
                                <div className="form-group d-flex justify-content-center ltr-direction">
                                    <ButtonGroup>
                                        {roles.map((role, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${idx}`}
                                                type="radio"
                                                variant={idx % 2 ? 'outline-success' : 'outline-success'}
                                                name="role_id"
                                                value={role.id}
                                                checked={formik.values.role_id == role.id}
                                                onChange={(e) => changeFormikField(e)}
                                            >
                                                {role.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                </div>
                                <div className='text-danger'>
                                    {formik.touched.role_id && formik.errors.role_id && (
                                        <div className="">{formik.errors.role_id}</div>
                                    )}
                                </div>
                            </div>



                            <div className="d-flex flex-row m-3">
                                <LoadingBtn loading={loading}></LoadingBtn>
                                <button onClick={goGroupHome}  className="btn  btn-outline-warning mx-3" >{i18next.t('cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StatusFrame>
    );
}
export default AddMember;