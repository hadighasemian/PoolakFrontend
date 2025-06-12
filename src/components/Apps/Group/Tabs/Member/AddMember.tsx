'use client';
import React, {useEffect, useState} from "react";
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js hooks
// import getConfiguredAxis from "@/Resource/Net/CreateAxiosInstance"; // Needs migration
// import AuthModel from "@/Resource/DB/Models/Auth/AuthModel"; // Needs migration
// import URLs from "@/Resource/Net/URLs"; // Needs migration
import {useFormik} from "formik";
import i18next from "i18next";
// import LoadingBtn from "@/Resource/Component/LoadingBtn"; // Needs migration
// import StatusFrame from "@/components/Apps/Other/StatusFrame"; // Needs migration
// import getAddress from "@/Resource/Routing/Addresses/getAddress"; // Needs migration
import {ButtonGroup, ToggleButton} from "react-bootstrap"; // Already installed

interface MemberFormValues {
    id: number | string; // Assuming id can be number or string
    mobile: string;
    role_id: string;
    loan_group_id?: string; // Added as it's used in goGroupHome
}

interface Role {
    id: string;
    name: string;
}

function AddMember() {
    const router = useRouter();
    const searchParams = useSearchParams(); // To get query params if we pass initValue that way

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);
    const [initialLoading, setInitialLoading] = useState(false); // Set to false, original was true then API call
    const [roles, setRoles] = useState<Role[]>([{id:'member', name:'عضو'}, {id:'admin', name:'ادمین'}]);
    // const axiosInstance = getConfiguredAxis(AuthModel()); // Needs migration

    // Original used location.state.initValue. For Next.js, this needs to be passed differently.
    // Option 1: Pass as query parameters. Example: /add-member?id=-1&mobile=&role_id=member&loan_group_id=xyz
    // Option 2: Store in global state (Redux, Zustand, Context) if complex.
    // For now, using searchParams and providing default if not present.
    const memberInit: MemberFormValues = {
        id: searchParams.get('id') || -1,
        mobile: searchParams.get('mobile') || '',
        role_id: searchParams.get('role_id') || 'member',
        loan_group_id: searchParams.get('loan_group_id') || ''
    };

    // useEffect(()=>{ // API call for roles
    //     setInitialLoading(true);
    //     axiosInstance.post(URLs.roles.index).then(function (response) {
    //         if (response?.data?.state?.success){
    //             setRoles(response?.data?.data?.roles)
    //         }
    //     }).catch(function (error) {
    //         setError(error)
    //     }).finally(()=>{
    //         setInitialLoading(false)
    //     });
    // },[])


    const goGroupHome = ()=>{
        // router.replace(getAddress('LoanGroup',member.loan_group_id)); // Needs getAddress and member.loan_group_id
        if (memberInit.loan_group_id) {
            router.replace(`/home/loan-group/${memberInit.loan_group_id}`);
        } else {
            router.replace('/home'); // Fallback
        }
    }
    const validate = (values: Partial<MemberFormValues>) => { // Allow partial for validation
        const errors: { mobile?: string } = {};
        const isValidMobileNumber = /^\d{11}$/.test(values.mobile || '');
        if (!values.mobile) {
            errors.mobile = 'موبایل ضروری است.';
        } else if (!isValidMobileNumber && values.mobile) { // Only validate if mobile is not empty
            // errors.mobile = 'Register number must be a 10-digit number'; // Original error
             errors.mobile = 'شماره موبایل باید 11 رقم باشد';
        }
        return errors;
    }
    const formik = useFormik<MemberFormValues>({
        initialValues: memberInit,
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            const postData = {...values}
            console.log("Submitting member data:", postData);
            // Mock submission
            setTimeout(() => {
                setLoading(false);
                goGroupHome();
            }, 1000);
            // axiosInstance.post(URLs.loan_groups.member.add,postData).then(function (response) {
            //     if (response?.data?.state?.success){
            //         goGroupHome()
            //     }
            // }).catch(function (error) {
            //     setErrors(error?.response?.data?.errors)
            // }).finally(()=>{
            //     setLoading(false)
            // });
        },
    });

    function changeFormikValue(name: keyof MemberFormValues, value: any){ // Typed name
        formik.setFieldValue(name, value);
    }
    function changeFormikField(e: React.ChangeEvent<HTMLInputElement>) { // Typed event
        const value = e.target.value;
        const name = e.target.name as keyof MemberFormValues; // Cast name
        changeFormikValue(name,value);
    }

    return (
        // <StatusFrame loading={initialLoading} error={error}> {/* StatusFrame needs migration */}
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
                                   disabled={memberInit.id !== -1 && memberInit.id !== ""} // Check for empty string too if id can be string
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
                                            checked={formik.values.role_id === role.id}
                                            onChange={changeFormikField} // formik.handleChange should also work if 'role_id' is the name
                                        >
                                            {role.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </div>
                            {formik.touched.role_id && formik.errors.role_id && (
                                <div className="text-danger mt-1 text-center">{formik.errors.role_id}</div>
                            )}
                        </div>
                        <div className="d-flex flex-row m-3">
                            {/* <LoadingBtn loading={loading}></LoadingBtn> */} {/* Needs migration */}
                             <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : (memberInit.id === -1 || memberInit.id === "" ? 'Add Member' : 'Update Member')}
                            </button>
                            <button onClick={goGroupHome} type="button" className="btn btn-outline-warning mx-3" >{i18next.t('cancel')}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // </StatusFrame>
    );
}
export default AddMember;
