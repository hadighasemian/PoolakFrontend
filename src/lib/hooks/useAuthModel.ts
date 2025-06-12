'use client'

import { useSelector } from 'react-redux'

export function useAuthModel() {
  let login = {
    login: false,
    token: '',
  }
  let user = {
    id: 0,
    name: "",
    mobile: "",
  }
  
  const auth = useSelector((state: any) => state.auth.auth)
  if (auth) {
    login = auth.login
    user = auth.user
  }
  
  return { login, user }
}