import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import getConfiguredAxis from "../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../Resource/DB/Models/Auth/AuthModel";
import URLs from "../../../../Resource/Net/URLs";
import { useFormik} from "formik";
import * as yup from "yup";
import i18next from "i18next";
import {DatePicker} from "@mui/x-date-pickers";
import LoadingBtn from "../../../../Resource/Component/LoadingBtn";
import StatusFrame from "../../../Other/StatusFrame";
import getAddress from "../../../../Resource/Routing/Addresses/getAddress";
import UnpackErrors from "../../../../Resource/Net/Error/UnpackErrors";

function AddTransaction() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [member,setMember] =  useState( []);
    const axiosInstance = getConfiguredAxis(AuthModel());
    const location = useLocation();
    const transaction = location.state.initValue ;
    const {loan_group_id} = useParams();
    const navigate = useNavigate();


    useEffect(()=>{
        axiosInstance.post(URLs['loan_group_member'],{'loan_group_id':loan_group_id}).then(function (response) {
            if (response?.data?.state?.success){
                setMember(response?.data?.data?.member)
                return
            }
        }).catch(function (error) {
            setError(error)
        }).finally(()=>{
            setInitialLoading(false)
            // getLoansOf(member[0]?.id)
        });
    },[])


    const goGroupHome = ()=>{
        navigate(getAddress('LoanGroup',loan_group_id), { replace: true });
        // toggleDialog()
    }

    function changeDate(date) {
        changeFormikValue('date',date)
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
        if (!yup
            .number()
            .integer()
            .min(0)
            .required().isValidSync(values.user_id)) {
            errors.user_id = i18next.t('Choose one of options');
        }
        return errors;
    }
    const formik = useFormik({
        initialValues: {...transaction},
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            values.loan_group_id = loan_group_id;
            axiosInstance.post(URLs['add_transaction'],values).then(function (response) {
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
    return(
        <StatusFrame loading={initialLoading} error={error}>
            <div className="container-fluid">
                <div className="row">
                    <div className='col pt-4'>
                        <form className='m-2' onSubmit={formik.handleSubmit}>
                            <div className="my-3">
                                <label htmlFor="user_id" className="form-label">عامل:</label>
                                <select
                                    className='form-select'
                                    value={formik.values.user_id}
                                    id="user_id"
                                    name="user_id"
                                    onChange={changeFormikField}
                                >
                                    <option id='user_-1' value='-1'>
                                        یکی از افراد را انتخاب کنید
                                    </option>
                                    {
                                        member?.map((option) => (
                                            <option  id={'user' + option?.id} value={option?.id}>
                                                {option.name}
                                            </option>
                                        ))
                                    }
                                </select>
                                {formik.touched.user_id && formik.errors.user_id && (
                                    <div className="text-danger">{formik.errors.user_id}</div>
                                )}
                            </div>
                            <div className="mt-3">
                                <div className="form-group">
                                    {/*<label></label>*/}
                                    <div className='d-flex flex-row justify-content-around'>

                                        <input
                                            className="btn-check"
                                            type="radio"
                                            name="type"
                                            value='1'
                                            id='positive'
                                            onChange={changeFormikField}
                                            checked={formik.values.type=='1'}

                                        />
                                        <label className="btn btn-outline-success w-25" htmlFor='positive'>
                                            واریز

                                        </label>


                                        <input
                                            className="btn-check"
                                            type="radio"
                                            id='negative'
                                            name="type"
                                            value='0'
                                            onChange={changeFormikField}
                                            checked={formik.values.type=='0'}
                                        />
                                        <label className="btn btn-outline-danger w-25" htmlFor='negative'>
                                            برداشت
                                        </label>
                                    </div>
                                </div>

                                {formik.touched.type && formik.errors.type && (
                                    <div className="text-danger">{formik.errors.type}</div>
                                )}
                            </div>
                            <div className="">
                                <label htmlFor="value" className="form-label">مبلغ:</label>
                                <input type="number"
                                       className="form-control"
                                       name='value'
                                       min="0"
                                       placeholder=''
                                       value={formik.values.value}
                                       onChange={formik.handleChange}
                                />
                                {formik.touched.value && formik.errors.value && (
                                    <div className="text-danger">{formik.errors.value}</div>
                                )}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="value" className="form-label">کد رهگیری:</label>
                                <input type="text"
                                       className="form-control"
                                       name='code'
                                       placeholder=''
                                       value={formik.values.code}
                                       onChange={formik.handleChange}
                                />
                                {formik.touched.code && formik.errors.code && (
                                    <div className="text-danger">{formik.errors.code}</div>
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
    )
}
export default AddTransaction;