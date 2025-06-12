'use client'

import useSWR from 'swr'
import { getConfiguredAxios } from '@/lib/net/CreateAxiosInstance'
import { useAuthModel } from './useAuthModel'
import URLs from '@/lib/net/URLs'

export function useHomeGroups() {
  const axiosInstance = getConfiguredAxios(useAuthModel())
  
  const fetcher = (url: string) => axiosInstance.post(url, {})
  
  const { data, error, isLoading } = useSWR(URLs.loan_groups.index, fetcher, {
    refreshInterval: 5000,
  })
  
  const loanGroups = data?.data?.data?.loanGroups
  
  return {
    loanGroups,
    loading: isLoading,
    error
  }
}