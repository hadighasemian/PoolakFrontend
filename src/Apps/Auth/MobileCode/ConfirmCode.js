import React, {useEffect, useState} from "react";
import getConfiguredAxis from "../../../Resource/Net/CreateAxiosInstance";
import {useFormik} from "formik";
import URLs from "../../../Resource/Net/URLs";
import StatusFrame from "../../Other/StatusFrame";
import LoadingBtn from "../../../Resource/Component/LoadingBtn";
import {setAuthState} from "../../../Resource/DB/Redux/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function ConfirmCode({authData,setPageState}) {
    const [loading, setLoading] = useState(false);
    const [time, setTime] = useState(authData.user.time);
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);
    const [data, setData] = useState(null);

    const axiosInstance = getConfiguredAxis(authData);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        // Exit the effect when the timer reaches 0
        if (time === 0) return;

        const timer = setInterval(() => {
            // Decrease the time by 1 second
            setTime((prevTime) => prevTime - 1);
        }, 1000); // 1000 milliseconds = 1 second

        // Cleanup the timer when the component unmounts
        return () => {
            clearInterval(timer);
        };
    }, [time]); // Re-run the effect whenever the 'time' state changes

    // Format the remaining time as minutes and seconds
    const  seconds= Math.floor(time / 60);
    const  minutes= time % 60;

    useEffect(()=>{
        if(login){
            navigate('/Home', { replace: true });
        }
    },[login])
    useEffect(()=>{
        if (data?.data?.data?.authState) {
            dispatch(setAuthState(data?.data?.data?.authState))
            setLogin(data?.data?.data?.authState?.login?.login)
        }
    },[data])
    const validate=values => {
        const errors = {};

        if (!values.code) {
            errors.code = 'Mobile number is required';
        } else if (!/^\d{4}$/.test(values.code)) {
            errors.code = 'کد 4 رقمه قربون شکلت برم من!';
        }

        return errors;
    }
    const formik = useFormik({
        initialValues: {
            code:'',
        },
        validate,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setLoading(true)
            const postData = {
                ...values,
                token:authData.login.token,
                mobile: authData.user.mobile,
                id: authData.user.id,
            }
            // console.log(values)
            axiosInstance.post(URLs['confirm_code'],postData).then(function (response) {
                console.log(response)
                if (response?.data?.state?.success){
                    setData(response)
                    return
                }
                setErrors(response.data.errors);
            }).catch(function (error) {
                setError(error)
            }).finally(()=>{
                setLoading(false)
            });
        },
    });
    function backToMobile() {
        setPageState('mobile')
    }

    return (
        <StatusFrame loading={loading} error={error}>
            <div className="container-fluid border-2 rounded-2 px-5 ">
                <div className="row">
                    <div className='col'>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group mt-2">
                                <label htmlFor="mobile">کد دریافتی:</label>
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    className={`form-control ${
                                        formik.touched.code && formik.errors.code
                                            ? 'is-invalid'
                                            : ''
                                    }`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.code}
                                />
                                {formik.touched.code && formik.errors.code && (
                                    <div className="invalid-feedback">{formik.errors.code}</div>
                                )}
                            </div>
                            <div className="d-flex flex-column justify-content-center m-3">
                                <LoadingBtn loading={loading}></LoadingBtn>
                                <button onClick={backToMobile} disabled={time>0} className='btn btn-outline-prime1 border-0 m-3'>
                                    {time>0?minutes+' : '+seconds:'تغییر شماره همراه'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </StatusFrame>
    );
}
export default ConfirmCode
