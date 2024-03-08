import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, { useState} from "react";
import getConfiguredAxis from "../../../../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../../../../Resource/DB/Models/Auth/AuthModel";
import URLs from "../../../../../Resource/Net/URLs";
import { useFormik} from "formik";
import i18next from "i18next";
import {DatePicker} from "@mui/x-date-pickers";
import LoadingBtn from "../../../../../Resource/Component/LoadingBtn";
import StatusFrame from "../../../../Other/StatusFrame";
import getAddress from "../../../../../Resource/Routing/Addresses/getAddress";
import UnpackErrors from "../../../../../Resource/Net/Error/UnpackErrors";

function AddPayment(props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const axiosInstance = getConfiguredAxis(AuthModel());
    const location = useLocation();
    const payment = location.state.payment ;
    const {group_id} = useParams();
    const navigate = useNavigate();

    const back = ()=>{
        navigate(getAddress('LoanGroup',group_id), { replace: true });
    }
    function changeFormikValue(name,value){
        formik.values[name]=value
        formik.setFieldValue(name, value);
    }
    function changeDate(date) {
        changeFormikValue('date',date)
    }

    const validate=values => {
        const errors = {};
        // if (!yup
        //     .number()
        //     .integer()
        //     .min(0)
        //     .required().isValidSync(values.owner_id)) {
        //     errors.owner_id = i18next.t('Choose one of options');
        // }
        return errors;
    }
    const formik = useFormik({
        initialValues: {...payment},
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            axiosInstance.post(URLs.loan_groups.payments.add,values).then(function (response) {
                if (response?.data?.state?.success){
                    back()
                    return
                }
            }).catch(function (error) {
                setErrors(UnpackErrors(error))
            }).finally(()=>{
                setLoading(false)
            });
        },
    });
//todo change date field
    return(
        <StatusFrame loading={loading} error={error}>
            <div className="container-fluid">
                <div className="row">
                    <div className='col pt-4'>
                        <form className='m-2' onSubmit={formik.handleSubmit}>
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
                            {/*//todo merge this two field date*/}
                            <div className="my-3">
                                <label htmlFor="date" className="form-label"> تاریخ دریافت:</label>
                                <input type='hidden'
                                    className='btn btn-outline-success d-inline-block'
                                    name='date'
                                />
                                    <DatePicker  className='d-inline-block border border-0 btn btn-light w-100'
                                        defaultValue={new Date(formik.values.date)}
                                        onChange={(date) => changeDate(date)}

                                    />
                                {formik.errors.date ? <div>{formik.errors.date}</div> : null}

                            </div>
                            <div className="d-flex flex-row m-3">
                                <LoadingBtn loading={loading}></LoadingBtn>
                                <button onClick={back} type='button' className="btn  btn-outline-warning mx-3" >{i18next.t('cancel')}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </StatusFrame>
    )
}
export default AddPayment;