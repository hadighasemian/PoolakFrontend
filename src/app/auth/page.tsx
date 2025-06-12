'use client'

import LoginLogo from '@/components/auth/LoginLogo'
import Login from '@/components/auth/Login'

export default function AuthPage() {
  return (
    <div className="container-fluid back h-100">
      <div className="row mb-5">
        <LoginLogo />
      </div>
      <div className='row p-1 h-100'>
        <Login />
      </div>
    </div>
  )
}