import { Dialog} from "@mui/material";
import { useState} from "react";
import getConfiguredAxis from "../../Resource/Net/CreateAxiosInstance";
import AuthModel from "../../Resource/DB/Models/Auth/AuthModel";
import URLs from "../../Resource/Net/URLs";
import {ErrorMessage, Field, Form, Formik} from "formik";
import i18next from "i18next";
import LoadingBtn from "../../Resource/Component/LoadingBtn";
import * as yup from "yup";

function AddLoanGroupDialog({group,open,toggleAddGroupDialog}) {
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        toggleAddGroupDialog();
    };
    const axiosInstance = getConfiguredAxis(AuthModel());

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        setLoading(true)
        axiosInstance.post(URLs['add_loan_group'],values).then(function (response) {
            if (response?.data?.state?.success){
                handleClose()
                return
            }

        }).catch(function (error) {
            setErrors(error?.response?.data?.errors)
        }).finally(()=>{
            setLoading(false)
        });
    };
    return (
        <Dialog className='rtl-direction' maxWidth='xs' open={open} onClose={handleClose}>
            <div className="card">
                <div className="card-header back-prime1">
                    اضافه کردن گروه وامی
                </div>
                <div className="card-body">
                    <div className='col'>
                        <Formik
                            initialValues={{...group}}
                            validate={values => {
                                const errors = {};
                                // using yup single line
                                if (!yup.string().min(8).max(30).isValidSync(values.loan_name)) {
                                    errors.loan_name = i18next.t('min length is and max is 30');
                                }
                                return errors;
                            }}
                            onSubmit={handleSubmit}
                        >
                            {({isSubmitting}) => (
                                <Form className='mx-5'>
                                    <div className="my-1">
                                        <Field type="hidden" className="form-control" name='id'/>
                                    </div>
                                    <div className="my-1">
                                        {/*<label htmlFor="mobile" className="form-label">نام کاربری (شماره همراه):</label>*/}
                                        <Field type="text" className="form-control" name='name' placeholder="نام گروه"/>
                                        <span className="form-text ">
                                            <ErrorMessage name="name" component="div"/>
                                        </span>
                                    </div>

                                    <div className="d-flex flex-row m-3">
                                        <LoadingBtn loading={loading}>

                                        </LoadingBtn>
                                        <button type='button' className="btn  btn-outline-warning mx-3" onClick={handleClose}>
                                            {i18next.t('cancel')}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </Dialog>

    );
}
export default AddLoanGroupDialog