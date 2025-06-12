'use client'

import { useState } from 'react'
import LoginLogo from '@/components/auth/LoginLogo'
import Mobile from '@/components/auth/forget/Mobile'
import Code from '@/components/auth/forget/Code'
import Pass from '@/components/auth/forget/Pass'

export default function ForgetPage() {
  const [pageState, setPageState] = useState('mobile')
  const [authData, setAuthData] = useState({
    login: {},
    user: {},
  })

  const renderPage = () => {
    switch (pageState) {
      case "mobile":
        return <Mobile setAuthData={setAuthData} setPageState={setPageState} />
      case "code":
        return <Code authData={authData} setPageState={setPageState} />
      case "pass":
        return <Pass authData={authData} setPageState={setPageState} />
      default:
        return null
    }
  }

  return (
    <div className="container-fluid back h-100">
      <div className="row mb-5">
        <LoginLogo />
      </div>
      <div className='row p-1 h-100'>
        {renderPage()}
      </div>
    </div>
  )
}