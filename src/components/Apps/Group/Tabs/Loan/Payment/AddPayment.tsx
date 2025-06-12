'use client';
import React, { useState} from "react";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import URLs from "@/Resource/Net/URLs"; // Needs migration
import { useFormik} from "formik";
import i18next from "i18next";
import {DatePicker} from "@mui/x-date-pickers"; // Already installed
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration
// import UnpackErrors from "@/Resource/Net/Error/UnpackErrors"; // Needs migration

interface PaymentFormValues {
    value: number | string;
    date: Date | string | null;
    // Add other fields from 'payment' like loan_id, owner_id etc. if they exist
    loan_id?: string; // Example if it's part of payment object
}

function AddPayment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null); // Typed error state
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Needs migration
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const group_id = params?.group_id as string; // group_id from route

    // Original: const payment = location.state.payment ;
    const paymentInit: Partial<PaymentFormValues> = { // Partial, as not all fields might be passed
        value: searchParams.get('value') || '',
        date: searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date(),
        loan_id: searchParams.get('loan_id') || '', // Example
    };

    const back = ()=>{
        // router.replace(getAddress('LoanGroup',group_id)); // Needs getAddress
        router.replace(`/home/loan-group/${group_id}`);
    }

    const validate = (values: Partial<PaymentFormValues>) => {
        const errors: any = {};
        if (!yup.number().min(0).required().isValidSync(values.value)) {
            errors.value = i18next.t('Amount must be a positive number');
        }
        if (!yup.date().required().isValidSync(values.date)) {
            errors.date = i18next.t('Date is required');
        }
        // if (!yup.string().required().isValidSync(values.loan_id)) { // Example validation
        //     errors.loan_id = i18next.t('Loan ID is required');
        // }
        return errors;
    }

    const formik = useFormik<PaymentFormValues>({
        initialValues: {
            value: paymentInit.value || '',
            date: paymentInit.date || new Date(),
            loan_id: paymentInit.loan_id || '', // Ensure all fields are initialized
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true);
            const postData = {...values, loan_group_id: group_id}; // Add group_id if API needs it
            console.log("Submitting payment data:", postData);
            // Mock submission
            setTimeout(() => {
                setLoading(false);
                back();
            }, 1000);
            // axiosInstance.post(URLs.loan_groups.payments.add,values).then(function (response) {
            //     if (response?.data?.state?.success){ back(); return }
            // }).catch(function (error) { setErrors(UnpackErrors(error))
            // }).finally(()=>{ setLoading(false) });
        },
    });

    function changeDate(date: Date | null) {
        formik.setFieldValue('date', date);
    }

    return(
        // <StatusFrame loading={loading} error={error}> {/* Needs migration */}
        <div className="container-fluid">
            <div className="row">
                <div className='col pt-4'>
                    <form className='m-2' onSubmit={formik.handleSubmit}>
                        <div className="mb-3">
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
                        <div className="my-3">
                            <label htmlFor="date" className="form-label d-block"> تاریخ پرداخت:</label>
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
                                {loading ? 'Saving...' : 'Add Payment'}
                            </button>
                            <button onClick={back} type='button' className="btn btn-outline-warning mx-3">{i18next.t('cancel')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </StatusFrame>
    )
}
export default AddPayment;
