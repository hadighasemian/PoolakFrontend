'use client';
import React, {useEffect, useState} from "react";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import URLs from "@/Resource/Net/URLs"; // Needs migration
import { useFormik} from "formik";
import * as yup from "yup";
import i18next from "i18next";
import {DatePicker} from "@mui/x-date-pickers"; // Already installed
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration
// import UnpackErrors from "@/Resource/Net/Error/UnpackErrors"; // Needs migration

interface TransactionFormValues {
    user_id: string;
    type: string; // '1' for positive, '0' for negative
    value: number | string;
    code: string;
    date: Date | string | null;
    loan_group_id?: string; // Added by formik submit
}

interface Member {
    id: string;
    name: string;
}

function AddTransaction() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [initialLoading, setInitialLoading] = useState(false);
    const [members, setMembers] =  useState<Member[]>([]); // Default to empty array
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Needs migration
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const loan_group_id = params?.loan_group_id as string;

    // Original: const transaction = location.state.initValue ;
    const transactionInit: Partial<TransactionFormValues> = { // Partial because some fields might be missing
        user_id: searchParams.get('user_id') || '',
        type: searchParams.get('type') || '1', // Default to 'positive'
        value: searchParams.get('value') || '',
        code: searchParams.get('code') || '',
        date: searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date(),
    };

    // useEffect(()=>{ // Fetch members
    //     setInitialLoading(true);
    //     axiosInstance.post(URLs.loan_groups.member.index,{'loan_group_id':loan_group_id}).then(function (response) {
    //         if (response?.data?.state?.success){ setMembers(response?.data?.data?.member) }
    //     }).catch(function (error) { setError(error)
    //     }).finally(()=>{ setInitialLoading(false) });
    // },[loan_group_id]);

    const goGroupHome = ()=>{
        // router.replace(getAddress('LoanGroup',loan_group_id)); // Needs getAddress
        router.replace(`/home/loan-group/${loan_group_id}`);
    }

    const validate = (values: Partial<TransactionFormValues>) => {
        const errors: any = {};
        if (!yup.string().required().isValidSync(values.user_id) || values.user_id === '-1') {
             errors.user_id = i18next.t('Choose one of options');
        }
        if (!values.type) {
            errors.type = i18next.t('Transaction type is required');
        }
        if (!yup.number().min(0).required().isValidSync(values.value)) {
            errors.value = i18next.t('Amount must be a positive number');
        }
        if (!yup.date().required().isValidSync(values.date)) {
            errors.date = i18next.t('Date is required');
        }
        return errors;
    }

    const formik = useFormik<TransactionFormValues>({
        initialValues: {
            user_id: transactionInit.user_id || '',
            type: transactionInit.type || '1',
            value: transactionInit.value || '',
            code: transactionInit.code || '',
            date: transactionInit.date || new Date(),
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            values.loan_group_id = loan_group_id;
            console.log("Submitting transaction data:", values);
            // Mock submission
            setTimeout(() => {
                setLoading(false);
                goGroupHome();
            }, 1000);
            // axiosInstance.post(URLs.loan_groups.transactions.add,values).then(function (response) {
            //     if (response?.data?.state?.success){ goGroupHome(); return }
            // }).catch(function (error) { setErrors(UnpackErrors(error))
            // }).finally(()=>{ setLoading(false) });
        },
    });

    function changeDate(date: Date | null) {
        formik.setFieldValue('date', date);
    }

    return(
        // <StatusFrame loading={initialLoading} error={error}> {/* Needs migration */}
        <div className="container-fluid">
            <div className="row">
                <div className='col pt-4'>
                    <form className='m-2' onSubmit={formik.handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="user_id" className="form-label">عامل:</label>
                            <select
                                className={`form-select ${formik.touched.user_id && formik.errors.user_id ? 'is-invalid' : ''}`}
                                value={formik.values.user_id}
                                id="user_id"
                                name="user_id"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="-1">یکی از افراد را انتخاب کنید</option>
                                {members?.map((option) => (
                                    <option key={'user' + option?.id} id={'user' + option?.id} value={option?.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.user_id && formik.errors.user_id && (
                                <div className="invalid-feedback">{formik.errors.user_id}</div>
                            )}
                        </div>
                        <div className="mt-3">
                            <div className="form-group">
                                <div className='d-flex flex-row justify-content-around'>
                                    <input
                                        className="btn-check" type="radio" name="type" value='1'
                                        id='positive' onChange={formik.handleChange}
                                        checked={formik.values.type=='1'}
                                    />
                                    <label className="btn btn-outline-success w-25" htmlFor='positive'>واریز</label>
                                    <input
                                        className="btn-check" type="radio" id='negative' name="type" value='0'
                                        onChange={formik.handleChange} checked={formik.values.type=='0'}
                                    />
                                    <label className="btn btn-outline-danger w-25" htmlFor='negative'>برداشت</label>
                                </div>
                                {formik.touched.type && formik.errors.type && (
                                    <div className="text-danger mt-1 text-center">{formik.errors.type}</div>
                                )}
                            </div>
                        </div>
                        <div className="my-3"> {/* Changed from "" to my-3 */}
                            <label htmlFor="value" className="form-label">مبلغ:</label>
                            <input type="number"
                                   className={`form-control ${formik.touched.value && formik.errors.value ? 'is-invalid' : ''}`}
                                   name='value' min="0" placeholder=''
                                   value={formik.values.value} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                            {formik.touched.value && formik.errors.value && (
                                <div className="invalid-feedback">{formik.errors.value}</div>
                            )}
                        </div>
                        <div className="mt-3"> {/* Changed from mt-4 to mt-3 */}
                            <label htmlFor="code" className="form-label">کد رهگیری:</label>
                            <input type="text"
                                   className="form-control" name='code' placeholder=''
                                   value={formik.values.code} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            />
                            {formik.touched.code && formik.errors.code && (
                                <div className="text-danger">{formik.errors.code}</div>
                            )}
                        </div>
                        <div className="my-3">
                            <label htmlFor="date" className="form-label d-block"> تاریخ:</label>
                            <DatePicker wrapperClassName="w-100" className='form-control d-inline-block w-100'
                                selected={formik.values.date ? new Date(formik.values.date) : null}
                                onChange={(date) => changeDate(date)} dateFormat="yyyy/MM/dd"
                            />
                            {formik.touched.date && formik.errors.date && (
                                <div className="text-danger d-block">{formik.errors.date}</div>
                            )}
                        </div>
                        <div className="d-flex flex-row m-3">
                            {/* <LoadingBtn loading={loading}></LoadingBtn> */} {/* Needs migration */}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Add Transaction'}
                            </button>
                            <button onClick={goGroupHome} type='button' className="btn btn-outline-warning mx-3">{i18next.t('cancel')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </StatusFrame>
    )
}
export default AddTransaction;
