'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import SplashLogo from '@/components/splash/SplashLogo'
import { useAuthModel } from '@/lib/hooks/useAuthModel'

export default function SplashPage() {
  const { login } = useAuthModel()
  const router = useRouter()

  useEffect(() => {
    if (login?.login === true) {
      router.replace('/home')
    } else {
      router.replace('/auth')
    }
  }, [login, router])

  return (
    <div className="container-fluid p-0">
      <header className="row h-25">
        <SplashLogo />
      </header>
    </div>
  )
}