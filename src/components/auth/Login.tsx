'use client'

import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import * as yup from "yup"
import i18next from "i18next"
import { setAuthState } from '@/lib/redux/authSlice'
import { getConfiguredAxios } from '@/lib/net/CreateAxiosInstance'
import { useAuthModel } from '@/lib/hooks/useAuthModel'
import LoadingBtn from '@/components/common/LoadingBtn'
import URLs from '@/lib/net/URLs'

export default function Login() {
  const [data, setData] = useState(null)
  const [login, setLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const router = useRouter()
  const axiosInstance = getConfiguredAxios(useAuthModel())

  useEffect(() => {
    if (login) {
      router.replace('/home')
    }
  }, [login, router])

  useEffect(() => {
    if (data?.data?.data?.authState) {
      dispatch(setAuthState(data?.data?.data?.authState))
      setLogin(data?.data?.data?.authState?.login?.login)
    }
  }, [data, dispatch])

  const validate = (values: any) => {
    const errors: any = {}
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    if (!values.mobile) {
      errors.mobile = i18next.t('Required')
    } else if (!yup.string().matches(phoneRegExp, 'Phone number is not valid').isValidSync(values.mobile)) {
      errors.mobile = 'Invalid phone number'
    }

    if (values.password.length < 8) {
      errors.password = i18next.t('Required')
    }
    return errors
  }

  const formik = useFormik({
    initialValues: { mobile: '', password: '' },
    validate,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true)
      axiosInstance.post(URLs.auth.login, values).then(function (response) {
        setData(response)
      }).catch(function (error) {
        setErrors(error?.response?.data?.errors)
      }).finally(() => {
        setLoading(false)
      })
    },
  })

  return (
    <form className='col mx-5' onSubmit={formik.handleSubmit}>
      <div className="my-4">
        <input
          type="tel"
          className="form-control"
          name='mobile'
          id='mobile'
          autoComplete='off'
          placeholder="شماره همراه"
          value={formik.values.mobile}
          onChange={formik.handleChange}
        />
        {formik.errors.mobile ? <div>{formik.errors.mobile}</div> : null}
      </div>
      <div className="my-4">
        <input
          type="password"
          name='password'
          id="password"
          className="form-control"
          placeholder="پسورد"
          onChange={formik.handleChange}
          aria-labelledby="passwordHelpInline"
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      <div className="row">
        <LoadingBtn loading={loading} />
      </div>

      <div className="row">
        <Link className='text-decoration-none m-2' href="/auth/register">ثبت نام کنید.</Link>
        <Link className='text-decoration-none m-2' href="/auth/forget">فراموشی رمز عبور.</Link>
      </div>
    </form>
  )
}