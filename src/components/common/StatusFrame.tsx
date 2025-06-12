'use client'

import React from 'react'
import Loading from './Loading'
import Error from './Error'

interface StatusFrameProps {
  children: React.ReactNode
  loading?: boolean
  error?: any
  className?: string
}

export default function StatusFrame({ 
  children, 
  loading = false, 
  error = false, 
  className = '' 
}: StatusFrameProps) {
  if (loading) return <Loading />
  if (error) return <Error error={error} />

  return (
    <div className={className}>
      {children}
    </div>
  )
}