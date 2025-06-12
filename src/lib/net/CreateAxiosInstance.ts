'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import URLs from './URLs'

export function getConfiguredAxios({ login, user }: any) {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const instance = axios.create({
    baseURL: URLs.base,
    timeout: 10000,
    headers: {
      'Authorization': 'Bearer ' + (login?.token ?? ''),
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  })

  instance.interceptors.response.use(
    response => {
      if (response?.data?.toastMessages?.length > 0) {
        // Handle toast messages
        response.data.toastMessages.forEach((msg: any) => {
          enqueueSnackbar(msg.msg, {
            variant: msg.config.variant,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
          })
        })
      }
      return response
    },
    error => {
      if (error.response?.status === 401) {
        router.replace('/auth')
      }
      return Promise.reject(error)
    }
  )

  return instance
}