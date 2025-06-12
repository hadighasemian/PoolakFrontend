'use client';
import React, {useEffect, useState} from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import URLs from "@/Resource/Net/URLs"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
import { useFormik} from "formik";
import * as yup from "yup";
import i18next from "i18next";
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
import 'react-datepicker/dist/react-datepicker.css'; // Keep for now
import {DatePicker} from "@mui/x-date-pickers"; // Already installed
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration
// import UnpackErrors from "@/Resource/Net/Error/UnpackErrors"; // Needs migration
// import haveAccess from "@/Resource/ACL/HaveAccess"; // Needs migration
// import GetLoanGroupAxis from "@/Resource/Net/Requests/GetLoanGroupAxis"; // Needs migration

interface LoanRequestFormValues {
    user_id: string;
    amount: number | string;
    length: number | string;
    date: Date | string | null;
    // Add other fields from 'loan' if any
}

interface Member {
    id: string;
    name: string;
}

function AddLoanRequest(){
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const group_id = params?.group_id as string;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [initialLoading, setInitialLoading] = useState(false);
    const [members, setMembers] =  useState<Member[]>([{id:'', name:'Loading members...'}]);
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Needs migration
    const len = Array.from(Array(72 - 1 + 1).keys(), i => i + 1);

    // Original: const loan = location.state.initValue ;
    const loanRequestInit: LoanRequestFormValues = {
        user_id: searchParams.get('user_id') || '',
        amount: searchParams.get('amount') || '',
        length: searchParams.get('length') || 1,
        date: searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date(),
    };

    // const canHaveAccess = haveAccess(); // Needs migration, default to true for now
    const canHaveAccess = true;

    // useEffect(()=>{ // Fetch members
    //     setInitialLoading(true);
    //     axiosInstance.post(URLs.loan_groups.member.index,{'loan_group_id':group_id}).then(function (response) {
    //         if (response?.data?.state?.success){ setMembers(response?.data?.data?.member) }
    //     }).catch(function (error) { setError(true)
    //     }).finally(()=>{ setInitialLoading(false) });
    // },[group_id]);

    const goGroupHome = ()=>{
        // router.replace(getAddress('LoanGroup',group_id)); // Needs getAddress
        router.replace(`/home/loan-group/${group_id}`);
    }

    function changeDate(date: Date | null) { // Typed date
        formik.setFieldValue('date', date);
    }

    const validate = (values: Partial<LoanRequestFormValues>) => {
        const errors: any = {};
        if (!yup.number().integer().min(1000).required().isValidSync(values.amount)) {
            errors.amount = i18next.t('loan min value 1000');
        }
        if (!yup.number().integer().min(1).max(72).required().isValidSync(values.length)) {
            // errors.amount = i18next.t('min length is 1 and max is 30'); // Original
            errors.length = i18next.t('min length is 1 and max is 72');
        }
        if (!yup.date().required().isValidSync(values.date)) {
            // errors.date = i18next.t('min length is and max is 30'); // Original
            errors.date = i18next.t('date is required');
        }
        if (!values.user_id || values.user_id === '-1' || values.user_id === '') {
            errors.user_id = i18next.t('requester is required');
        }
        return errors;
    }

    const formik = useFormik<LoanRequestFormValues>({
        initialValues: loanRequestInit,
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            const postData = {...values, loan_group_id: group_id};
            console.log("Submitting loan request data:", postData);
            // Mock Submission
            setTimeout(() => {
                setLoading(false);
                goGroupHome();
            }, 1000);
            // axiosInstance.post(URLs.loan_groups.loan_request.add,postData).then(function (response) {
            //     if (response?.data?.state?.success){ goGroupHome(); return }
            // }).catch(function (error) {
            //     setErrors(UnpackErrors(error))
            // }).finally(()=>{ setLoading(false) });
        },
    });

    return (
        // <StatusFrame loading={initialLoading} error={error}> {/* Needs migration */}
        <div className="container-fluid">
            <div className="row">
                <div className='col pt-4'>
                    <form className='m-2' onSubmit={formik.handleSubmit}>
                        <div className="my-3">
                            <label htmlFor="user_id" className="form-label">درخواست کننده:</label>
                            <select
                                className={`form-select ${formik.touched.user_id && formik.errors.user_id ? 'is-invalid' : ''}`}
                                id="user_id"
                                name="user_id"
                                disabled={!canHaveAccess} // Uses canHaveAccess
                                value={formik.values.user_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">یکی از افراد را انتخاب کنید.</option>
                                {members?.map((option) => (
                                    <option key={option?.id} id={'op_'+option?.id} value={option?.id}>
                                        {option?.name}
                                    </option>
                                ))}
                            </select>
                            {formik.touched.user_id && formik.errors.user_id && (
                                <div className="invalid-feedback">{formik.errors.user_id}</div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">مبلغ درخواستی:</label>
                            <input type="number"
                                   className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''}`}
                                   name='amount'
                                   min="0"
                                   placeholder=''
                                   value={formik.values.amount}
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                                <div className="invalid-feedback">{formik.errors.amount}</div>
                            )}
                        </div>
                        <div className="my-3">
                            <label htmlFor="length" className="form-label">مدت درخواستی وام:</label>
                            <select
                                className={`form-select ${formik.touched.length && formik.errors.length ? 'is-invalid' : ''}`}
                                value={formik.values.length}
                                id="length"
                                name="length"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                {len.map((option) => (
                                    <option key={'le-'+option} id={'le-'+option} value={option}>
                                           {option}  ماهه
                                    </option>
                                ))}
                            </select>
                            {formik.touched.length && formik.errors.length && (
                                <div className="invalid-feedback">{formik.errors.length}</div>
                            )}
                        </div>
                        <div className="my-3">
                            <label htmlFor="date" className="form-label d-block"> تاریخ درخواستی پرداخت:</label>
                             <DatePicker wrapperClassName="w-100" className='form-control d-inline-block w-100'
                                         selected={formik.values.date ? new Date(formik.values.date) : null}
                                         onChange={(date) => changeDate(date)}
                                         dateFormat="yyyy/MM/dd"
                            />
                            {formik.touched.date && formik.errors.date && (
                                <div className="text-danger d-block">{formik.errors.date}</div>
                            )}
                        </div>
                        <div className="d-flex flex-row m-3">
                            {/* <LoadingBtn loading={loading}></LoadingBtn> */} {/* Needs migration */}
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Add Loan Request'}
                            </button>
                            <button onClick={goGroupHome} type='button' className="btn btn-outline-warning mx-3" >{i18next.t('cancel')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </StatusFrame>
    );
}
export default AddLoanRequest;
