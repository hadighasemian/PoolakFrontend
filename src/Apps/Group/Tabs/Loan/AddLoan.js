import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getConfiguredAxis from "../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";
import URLs from "../../../../Resource/Net/URLs";
import StatusFrame from "../../../Other/StatusFrame";
import { useFormik} from "formik";
import * as yup from "yup";
import i18next from "i18next";
import LoadingBtn from "../../../../Resource/Component/LoadingBtn";
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker.css';
import {DatePicker} from "@mui/x-date-pickers";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import UnpackErrors from "../../../../Resource/Net/Error/UnpackErrors";
import GetLoanGroupAxis from "../../../../Resource/Net/Requests/GetLoanGroupAxios";

function AddLoan(){
    const navigate = useNavigate();
    const {group_id} = useParams()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [members,setMembers] =  useState([{id:'', name:''}])
    // const [startDate,setStartDate] =  useState(new Date())
    const axiosInstance = getConfiguredAxis(AuthModel());
    const len = Array.from(Array(72 - 1 + 1).keys(), i => i + 1);
    const location = useLocation();
    const loan = location.state.initValue ;

    useEffect(()=>{
        axiosInstance.post(URLs['loan_group_member'],{'loan_group_id':group_id}).then(function (response) {
            if (response?.data?.state?.success){
                setMembers(response?.data?.data?.member)
                return
            }
        }).catch(function (error) {
            setError(true)
        }).finally(()=>{
            setInitialLoading(false)
        });
    },[])


    const goGroupHome = ()=>{
        navigate(getAddress('LoanGroup',group_id), { replace: true });
    }

    function changeDate(date) {
        changeFormikValue('date',date)
    }
    const validate=values => {
        const errors = {};
        if (!yup
            .number()
            .integer()
            .min(1000)
            .required().isValidSync(values.amount)) {
            errors.amount = i18next.t('loan min value 1000');
        }
        if (!yup
            .number()
            .integer()
            .min(1)
            .max(72)
            .required().isValidSync(values.length)) {
            errors.amount = i18next.t('min length is 1 and max is 30');
        }
        if (!yup
            .date()
            .required().isValidSync(values.date)) {
            errors.date = i18next.t('min length is and max is 30');
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {...loan},
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            const postData = {...values,loan_group_id:group_id}
            axiosInstance.post(URLs['add_loan'],postData).then(function (response) {
                if (response?.data?.state?.success){
                    goGroupHome()
                    return
                }
            }).catch(function (error) {
                setErrors(UnpackErrors(error))
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
        changeFormikValue(e.target.name,e.target.value)
    }


    return (
        <StatusFrame loading={initialLoading} error={error}>
            <div className="container-fluid">
                <div className="row">
                    <div className='col pt-4'>
                        <form className='m-2' onSubmit={formik.handleSubmit}>
                            <div className="my-3">
                                <label htmlFor="user_id" className="form-label">دریافت کننده:</label>
                                <select
                                    className='form-select'
                                    id="user_id"
                                    name="user_id"
                                    value={formik.values.user_id}
                                    onChange={changeFormikField}
                                >
                                    <option id='user_-1' value='-1'>
                                        یکی از افراد را انتخاب کنید
                                    </option>
                                    {
                                        members?.map((option) => (
                                            <option id={'op_'+option?.id} value={option?.id}>
                                                {option?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                {formik.touched.user_id && formik.errors.user_id && (
                                    <div className="text-danger">{formik.errors.user_id}</div>
                                )}
                            </div>
                            <div className="">
                                <label htmlFor="amount" className="form-label">مبلغ:</label>
                                <input type="number"
                                       className="form-control"
                                       name='amount'
                                       min="0"
                                       placeholder=''
                                       value={formik.values.amount}
                                       onChange={formik.handleChange}
                                />
                                {formik.touched.amount && formik.errors.amount && (
                                    <div className="text-danger">{formik.errors.amount}</div>
                                )}
                            </div>
                            <div className="my-3">
                                <label htmlFor="length" className="form-label">مدت وام:</label>
                                <select
                                        className='form-select'
                                        value={formik.values.length}
                                        id="length"
                                        name="length"
                                        onChange={changeFormikField}
                                    >
                                    {len.map((option) => (
                                        <option id={'le-'+option} value={option}>
                                               {option}  ماهه
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.length && formik.errors.length && (
                                    <div className="text-danger">{formik.errors.length}</div>
                                )}
                            </div>
                            <div className="my-3">
                                <label htmlFor="date" className="form-label"> تاریخ دریافت:</label>
                                <input type='hidden'
                                       className='btn btn-outline-success d-inline-block'
                                       name='date'
                                />
                                <DatePicker  className='d-inline-block border border-0 btn btn-prime1 w-100'
                                             defaultValue={new Date(formik.values.date)}
                                             onChange={(date) => changeDate(date)}
                                />
                                {formik.touched.date && formik.errors.date && (
                                    <div className="text-danger">{formik.errors.date}</div>
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
    );
}
export default AddLoan;